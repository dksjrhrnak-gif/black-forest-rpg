/* Boss-earned advancement, layered after frozen rewards. No combat/RNG changes. */
(function(root){'use strict';const C=root.BFContent,G=root.BlackForest.Game,P=G.prototype;
const milestones={0:1,2:2,5:3};
const repairs=[['x_magic_1','x_magic_9'],['victor_heir','x_support_15']];
for(const [parent,child] of repairs){const a=C.JOBS[parent],b=C.JOBS[child];if(!a||!b||a.hidden||b.hidden||b.tier!==a.tier+1||a.family!==b.family)throw Error('전직 계보 연결 오류');if(!a.children.includes(child))a.children.push(child);if(!b.parents.includes(parent))b.parents.push(parent);}
C.PROMOTION_REPAIRS=repairs;
function prospective(g){const s=g.s,r=s.rewardState,j=C.JOBS[s.job];if(!j||j.hidden||s.career.hiddenPath||s.kind!=='story'||!r||r.claimed||!milestones[s.area]||j.tier>=milestones[s.area])return null;
 if(s.cleared.includes(s.area)||r.after.cleared.length!==s.cleared.length+1||!r.after.cleared.includes(s.area)||s.resultVisual?.category!=='bosses')return null;
 return {tier:milestones[s.area],area:s.area,rewardId:r.id};}
P.promotionStatus=function(){const p=this.s.career.promotion||prospective(this);if(!p)return null;const j=C.JOBS[this.s.job];if(j.hidden||j.tier>=p.tier)return null;return {...p,ready:this.s.scene==='camp'&&this.s.rewardState?.claimed===true};};
P.promotionCandidates=function(){const p=this.promotionStatus();if(!p?.ready)return [];const normal=C.JOBS[this.s.job].children.map(id=>({id,progress:this.unlockProgress(id).slice(5)}));const rescue=normal.every(c=>!c.progress.every(r=>r.now>=r.need));
 return normal.map(c=>({...c,available:rescue||c.progress.every(r=>r.now>=r.need),rescue:rescue&&c.progress.some(r=>r.now<r.need)})).concat(this.s.unlocked.filter(id=>C.JOBS[id]?.hidden&&this.unlockProgress(id).every(r=>r.now>=r.need)).map(id=>({id,available:true,rescue:false,progress:this.unlockProgress(id)})));};
const claim=P.claimVictory;P.claimVictory=function(){const pending=prospective(this),paid=claim.call(this);if(paid&&pending)this.s.career.promotion=pending;return paid;};
const advance=P.advance;P.advance=function(){if(this.promotionStatus()?.ready)return;const s=this.s,r=s.rewardState;if(s.career.promotion&&r?.claimed&&s.scene==='reward'&&r.destination==='camp'){s.scene='camp';return;}return advance.call(this);};
const available=P.jobAvailable;P.jobAvailable=function(id){id=C.HIDDEN_ALIASES[id]||id;if(this.promotionStatus()?.ready)return this.promotionCandidates().some(c=>c.id===id&&c.available);return available.call(this,id);};
const candidates=P.careerCandidates;P.careerCandidates=function(){return this.promotionStatus()?.ready?this.promotionCandidates():candidates.call(this);};
const change=P.changeJob;P.changeJob=function(id){const pending=this.promotionStatus();change.call(this,id);if(pending?.ready&&(C.JOBS[this.s.job].hidden||C.JOBS[this.s.job].tier>=pending.tier))delete this.s.career.promotion;};
for(const name of ['travel','enterArea','nextEncounter','choose','fight','thread','bondQuest','meetNpc','resumeJourney','resumeChapter','pauseChapter','retreat','postgame','finish','abandonChapter']){const fn=P[name];if(!fn)continue;P[name]=function(...args){const p=this.promotionStatus();if(p&&(p.ready||name!=='nextEncounter'))return;return fn.apply(this,args);};}
// Old saves without the optional field remain byte-identical. Validate new gates
// against an already-paid regional boss receipt; never recompute or grant rewards.
const load=G.load;G.load=function(input){const g=load.call(this,input),p=g.s.career.promotion;if(p!==undefined){const s=g.s,r=s.rewardState,bad=()=>{throw Error('전직 기록 검증 실패');};if(!p||Object.keys(p).sort().join(',')!=='area,rewardId,tier'||milestones[p.area]!==p.tier||!Number.isInteger(p.area)||!Number.isSafeInteger(p.rewardId)||p.rewardId<1||!r||r.id!==p.rewardId||!r.claimed||r.destination!=='camp'||s.kind!=='story'||!s.cleared.includes(p.area)||s.cleared.length!==p.area+1||!['camp','loot','reward'].includes(s.scene)||s.checkpoint||C.JOBS[s.job]?.hidden||C.JOBS[s.job]?.tier>=p.tier)bad();}return g;};
})(globalThis);
