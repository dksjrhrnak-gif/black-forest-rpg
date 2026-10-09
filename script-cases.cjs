/* Synthetic review states, never user saves. Browser import uses the normal BF2 path. */
const C=require('./test-support.cjs');
function fresh(seed=71){const g=new C.Game(seed);g.start('warrior');Object.assign(g.s,{level:12,gold:9000,ore:100,herb:100,wood:100,mercy:10});g.s.hp=g.maxHp();g.s.mp=g.maxMp();return g;}
function chapter(area,sector){const g=fresh();g.s.cleared=Array.from({length:area},(_,i)=>i);g.travel(area);g.s.step=sector*4;g.s.scene='map';g.s.routes=['story'];g.choose(0);return g;}
function thread(id,stage){const g=fresh();g.s.cleared=[0,1,2,3];g.s.threads[id]=stage;g.addAffinity(id,80-g.getAffinity(id));g.thread(id);return g;}
function bond(id,stage){const g=fresh();g.s.cleared=[0,1,2,3];g.s.threads[id]=2;g.s.bondQuests[id]=stage;g.addAffinity(id,80-g.getAffinity(id));g.bondQuest(id);return g;}
function event(id){const g=fresh();g.s.scene='event';g.s.eventId=id;if(C.EVENTS[id].region!==undefined){g.s.area=C.EVENTS[id].region;g.s.cleared=Array.from({length:g.s.area},(_,i)=>i);g.s.storyFlags['chapter_'+g.s.area+'_seen']=true;}g.note(C.EVENTS[id].text);return g;}
function final(){const g=fresh();g.s.cleared=[0,1,2,3,4,5,6,7];g.s.factions={lantern:4,ink:4,hunt:4};for(const id of Object.keys(C.NPCS))g.addAffinity(id,85-g.getAffinity(id));g.s.bondOutcome={alice:'saved',adam:'saved',ahab:'saved'};g.s.bondQuests={alice:2,adam:2,ahab:2};g.s.scene='final';return g;}
function numericalCases(){const rows=[];const snap=(key,g)=>{const s=JSON.parse(JSON.stringify(g.s));delete s.message;delete s.log;delete s.ending;s.decisions=Object.keys(s.decisions).sort();rows.push({key,state:s,rng:g.rng.getState()});};
 for(let a=0;a<8;a++)for(let t=0;t<3;t++)for(let i=0;i<3;i++){const g=chapter(a,t);g.chapterChoice(i);snap(`chapter:${a}:${t}:${i}`,g);}
 for(const id of ['alice','adam','ahab'])for(let stage=0;stage<2;stage++){for(let i=0;i<4;i++){const g=thread(id,stage);g.dialogue(i);snap(`thread:${id}:${stage}:${i}`,g);}for(let i=0;i<3;i++){const g=bond(id,stage);g.bondChoice(i);snap(`bond:${id}:${stage}:${i}`,g);}}
 for(const e of C.EVENTS.slice(0,18))for(let i=0;i<e.choices.length;i++){const g=event(e.id);g.event(i);snap(`event:${e.id}:${i}`,g);}
 for(let i=0;i<3;i++){const g=final();g.finish(i);snap(`ending:${i}`,g);g.postgame();snap(`postgame:${i}`,g);}return rows;}
module.exports={C,fresh,chapter,thread,bond,event,final,numericalCases};
