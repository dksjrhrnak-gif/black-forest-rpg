(function(root){'use strict';
const C=root.BFContent,copy=x=>JSON.parse(JSON.stringify(x));
// The short-lived GitHub six-slot schema is read-only input. Only three slots contribute stats.
C.migrateThreeSlotEquipment=function(s){
 const source=s.equipment??s.player?.equipment;
 if(source===undefined)return false;
 if(!source||typeof source!=='object')throw Error('장비 저장 형식이 올바르지 않습니다.');
 const slots=['weapon','armor','charm'],oldSlots=[...slots,'acc','subweapon','head','relic'];
 const archive=Array.isArray(s.legacyEquipment)?copy(s.legacyEquipment):[];
 const normalize=(item,slot)=>{if(typeof item==='string'){const base=C.ITEMS.find(x=>x.id===item);if(!base)throw Error('저장된 장비 ID를 찾을 수 없습니다.');item={...copy(base),power:base.basePower??0,grade:base.fixedGrade??(base.unique?4:0),plus:0,fails:0,affixes:[]};}if(!item||typeof item!=='object'||Array.isArray(item))throw Error('장비 데이터가 올바르지 않습니다.');const d=copy(item);d.slot=d.slot||slot;if(!oldSlots.includes(d.slot))throw Error('알 수 없는 장비 부위입니다.');if(d.slot==='acc')d.slot='charm';return d;};
 const target={};const put=(item,slot)=>{if(item==null)return;const d=normalize(item,slot);if(!slots.includes(d.slot)||target[d.slot])archive.push(d);else target[d.slot]=d;};
 if(Array.isArray(source))source.forEach(d=>put(d));else for(const [slot,item] of Object.entries(source)){if(item!=null&&(item.slot||slot)!==slot&&!(slot==='acc'&&item.slot==='charm'))throw Error('장비 슬롯이 일치하지 않습니다.');put(item,slot);}
 for(const slot of slots){if(!target[slot]&&s[slot])put(s[slot],slot);s[slot]=target[slot]||{id:'starter-'+slot,name:{weapon:'빈 무기 슬롯',armor:'빈 갑옷 슬롯',charm:'빈 장신구 슬롯'}[slot],slot,power:0,grade:0,plus:0,affixes:[],fails:0};}
 if(!Array.isArray(s.bag))throw Error('장비 가방 형식이 올바르지 않습니다.');
 s.bag=s.bag.map(d=>normalize(d)).filter(d=>{if(slots.includes(d.slot))return true;archive.push(d);return false;});
 if(s.loot){s.loot=normalize(s.loot);if(!slots.includes(s.loot.slot)){archive.push(s.loot);s.loot=null;if(s.scene==='loot'){s.scene=s.pending;s.pending='reward';}}}
 if(archive.length>100)throw Error('보존 장비 한도를 초과했습니다.');
 s.legacyEquipment=archive;s.equipmentMigration=1;delete s.equipment;delete s.equipmentSchema;
 if(s.player&&typeof s.player==='object')delete s.player.equipment;
 for(const key of ['subweapon','head','acc','relic'])delete s[key];
 return true;
};
})(globalThis);
