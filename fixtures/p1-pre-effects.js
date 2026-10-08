/* Common effects adapt the legacy rules without changing order or random draws. */
(function(root){'use strict';const C=root.BFContent;
const targets={commonDmg:'common',boss:'boss',eliteDmg:'elite',opening:'opening',below:'lowHealth',execution:'execution'};
const passthrough=['defendMana','guardNext','healKill','dodgeBonus','guardHeal','thornsBonus','leechBonus','skillSaver','normalPierce','potionBoost','critBonus','skillDot','goldBonus'];
const skills={warrior:{power:1.5,stun:1},rogue:{power:1.5,dot:{base:5,turns:3,status:'poison'}},mage:{power:2,magic:true,dot:{base:6,turns:2,status:'burn'}},paladin:{power:1.6,heal:.15},blood:{power:1.9,leech:.3},rune:{power:1.85,magic:true,weak:1},shadow:{power:1.6,execute:{threshold:.35,power:3}},gambler:{power:'roll'},chrono:{power:1.5,magic:true,stun:1}};
const stats={rogue:{critBase:.25},blood:{lowHealthAttack:10},shadow:{dodgeBase:.12},gambler:{luckBase:.05}};
function encode(j){const list=[];for(const [key,value] of Object.entries(j.traits||{})){if(targets[key])list.push({type:'damageMultiplier',target:targets[key],value});else if(passthrough.includes(key))list.push({type:key,value});}if(j.traits?.comboEvery)list.push({type:'combo',every:j.traits.comboEvery,value:j.traits.comboDamage});
 const s=skills[j.id]||{power:1.7,magic:j.family==='magic',heal:j.family==='support'?.06:0,weak:j.family==='occult'?1:0,pierce:j.family==='ranged'?4:0};
 list.push({type:'skillPower',value:s.power});if(s.magic)list.push({type:'skillMagic',value:true});if(s.stun)list.push({type:'skillStun',value:s.stun});if(s.dot)list.push({type:'skillDotLevel',...s.dot});if(s.heal)list.push({type:'skillHeal',value:s.heal});if(s.leech)list.push({type:'skillLeech',value:s.leech});if(s.weak)list.push({type:'skillWeak',value:s.weak});if(s.pierce)list.push({type:'skillPierce',value:s.pierce});if(s.execute)list.push({type:'skillExecution',...s.execute});for(const [type,value] of Object.entries(stats[j.id]||{}))list.push({type,value});return list;
}
for(const j of Object.values(C.JOBS))j.effects=encode(j);
C.EFFECT_TYPES=['damageMultiplier',...passthrough,'combo','skillPower','skillMagic','skillStun','skillDotLevel','skillHeal','skillLeech','skillWeak','skillPierce','skillExecution','critBase','lowHealthAttack','dodgeBase','luckBase'];
C.effectValue=(id,type,fallback=0)=>C.JOBS[id]?.effects.find(e=>e.type===type)?.value??fallback;
C.effectTraits=function(id){const out={},reverse=Object.fromEntries(Object.entries(targets).map(([k,v])=>[v,k]));for(const e of C.JOBS[id]?.effects||[]){if(e.type==='damageMultiplier')out[reverse[e.target]]=e.value;else if(e.type==='combo'){out.comboEvery=e.every;out.comboDamage=e.value;}else if(passthrough.includes(e.type))out[e.type]=e.value;}return out;};
C.applySkill=function(game,damage){const s=game.s,e=s.enemy;let magic=false,leech=0;const roll=game.rand(8,35)/10; // Legacy consumes this draw for every skill, including non-gamblers.
 const effects=C.JOBS[s.job].effects,p=effects.find(x=>x.type==='skillPower'),execute=effects.find(x=>x.type==='skillExecution');let power=p.value==='roll'?roll:p.value;if(execute&&e.hp/e.maxHp<execute.threshold)power=execute.power;damage=Math.round(damage*power);
 const handlers={skillMagic:x=>{magic=x.value;},skillStun:x=>{e.stun=x.value;},skillDotLevel:x=>{e.dot=x.base+Math.floor(s.level/3);e.dotTurns=x.turns;e.dotId=x.status;},skillHeal:x=>{s.hp=Math.min(game.maxHp(),s.hp+Math.ceil(game.maxHp()*x.value));},skillLeech:x=>{leech=x.value;},skillWeak:x=>{e.weak=x.value;},skillPierce:x=>{damage+=Math.min(x.value,e.def);},skillDot:x=>{e.dot=Math.max(e.dot,x.value);e.dotTurns=3;e.dotId='bleed';}};
 // Legacy skillDot overwrites the base dot last; preserve that precedence.
 for(const x of effects.filter(x=>x.type!=='skillDot'))handlers[x.type]?.(x);for(const x of effects.filter(x=>x.type==='skillDot'))handlers[x.type](x);return {damage,magic,leech};
};
C.enemyStatuses=e=>!e?[]:[e.dotTurns?{id:e.dotId||'damageOverTime',duration:e.dotTurns,value:e.dot}:null,e.stun?{id:'stun',duration:1,value:e.stun}:null,e.weak?{id:'atkDown',duration:1,value:.3}:null,e.guarded?{id:'guard',duration:1,value:1}:null].filter(Boolean);
})(globalThis);
