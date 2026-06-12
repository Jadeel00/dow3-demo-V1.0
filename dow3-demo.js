const state = {
  currentView: "dashboard",
  funders: [
    {
      id: "FU-001", name: "Lista Protocol", type: "DeFi 借贷协议", contact: "Lista BD",
      eligible: ["LOC", "DPL", "Fast Pay"], minYield: 11.0, minTicket: 50000, maxTicket: 500000,
      tenure: ["随时可赎回", "3个月", "6个月"], committed: 600000, status: "活跃", reminded: "",
      startDate: "2026-06-13", dueDate: "2026-12-13",
      note: "BNB Chain 头部借贷协议，接受多类资产，流动性优先，期限灵活。",
    },
    {
      id: "FU-002", name: "Volo Protocol", type: "流动性质押协议", contact: "Volo Partnerships",
      eligible: ["DPL"], minYield: 13.0, minTicket: 100000, maxTicket: 400000,
      tenure: ["3个月", "6个月"], committed: 500000, status: "活跃", reminded: "",
      startDate: "2026-06-15", dueDate: "2026-09-15",
      note: "质押池资金偏好中长期 DPL 资产，收益要求较高，不接受 LOC 和 Fast Pay。",
    },
    {
      id: "FU-003", name: "蚂蚁数科", type: "持牌数字金融机构", contact: "蚂蚁数科合作团队",
      eligible: ["Fast Pay"], minYield: 10.0, minTicket: 50000, maxTicket: 300000,
      tenure: ["随时可赎回", "3个月"], committed: 800000, status: "活跃", reminded: "",
      startDate: "2026-06-12", dueDate: "2026-09-12",
      note: "持牌机构，专注 Fast Pay 类资产，合规资料要求严格，额度充足。",
    },
  ],
  funderSeq: 3,
  assets: [
    {
      id: "AS-001", name: "LOC-Alpha-001", category: "LOC", amount: 620000, yield: "13.2%", tenure: "6个月", deadline: "2026-06-25", status: "待匹配", docs: "完整", applicant: "张维（Alpha 资产方）", reminded: "",
      qualification: {
        controller: { status: "通过", nationality: "香港", identity: "香港公司董事 / 实控人", credit: "征信正常、非失信、未命中黑名单" },
        company: { status: "通过", age: "香港主体 14 个月", type: "跨境电商（合规品类）", ltmGmv: "LTM GMV 680 万 RMB", entity: "境外主体（香港）" },
        shop: { status: "通过", returnRate: "退货率 18%", repayRate: "回款率 72%（月回款 ≥ 贷款 66%）", closeRate: "关店率 9%", platform: "Amazon、Walmart（双锁）" },
      },
    },
    {
      id: "AS-002", name: "DPL-Orbit-018", category: "DPL", amount: 410000, yield: "14.8%", tenure: "3个月", deadline: "2026-06-16", status: "资料缺失", docs: "缺商业登记证、物流账单", applicant: "王琳（Orbit 资产方）", reminded: "",
      qualification: {
        controller: { status: "通过", nationality: "大陆", identity: "香港公司董事 + 连带责任保证", credit: "征信正常" },
        company: { status: "待补", age: "香港主体 8 个月", type: "物流（合规）", ltmGmv: "LTM GMV 待补（缺商业登记证）", entity: "境外主体（香港）" },
        shop: { status: "通过", returnRate: "退货率 22%", repayRate: "回款率 65%", closeRate: "关店率 15%", platform: "Shopee（双锁）" },
      },
    },
    {
      id: "AS-003", name: "FP-Mercury-009", category: "Fast Pay", amount: 180000, yield: "10.6%", tenure: "随时可赎回", deadline: "2026-06-30", status: "待复核", docs: "待运营复核", applicant: "陈默（Mercury 资产方）", reminded: "",
      qualification: {
        controller: { status: "通过", nationality: "大陆", identity: "香港公司董事 / 实控人", credit: "征信正常" },
        company: { status: "通过", age: "大陆主体 3 年", type: "快消（合规）", ltmGmv: "LTM GMV 540 万 RMB", entity: "境外主体（香港）" },
        shop: { status: "通过", returnRate: "退货率 25%", repayRate: "回款率 68%", closeRate: "关店率 20%", platform: "TikTok Shop（单锁）+ Amazon（双锁）" },
      },
    },
  ],
  funds: [
    { id: "FR-2026-0527-01", funderId: "FU-003", coin: "USDT", amount: 180000, network: "Tron", status: "稳定币已到账", fiat: 0 },
    { id: "FR-2026-0527-02", funderId: "FU-002", coin: "USDC", amount: 420000, network: "Ethereum", status: "稳定币换汇中", fiat: 0 },
    { id: "FR-2026-0526-07", funderId: "FU-001", coin: "USDT", amount: 760000, network: "Tron", status: "法币已到账", fiat: 757820 },
  ],
  costs: [
    { type: "平台换汇手续费", original: "100 USDT", reporting: "USD 100.00", source: "FR-2026-0527-01" },
    { type: "汇率磨损", original: "少形成 USD 49.95", reporting: "USD 49.95", source: "FR-2026-0527-01" },
    { type: "法币提现手续费", original: "USD 35.00", reporting: "USD 35.00", source: "FR-2026-0526-07" },
  ],
  fundDocs: [
    { name: "NDA", status: "已归档", reminded: "" },
    { name: "借贷协议", status: "已归档", reminded: "" },
    { name: "债权转让协议", status: "待签署", reminded: "" },
    { name: "技术服务协议", status: "已归档", reminded: "" },
  ],
  assetDocs: [
    { name: "支用协议", status: "已上传", reminded: "" },
    { name: "借贷协议", status: "已上传", reminded: "" },
    { name: "公司注册书", status: "已上传", reminded: "" },
    { name: "商业登记证", status: "缺失", reminded: "" },
    { name: "物流账单", status: "缺失", reminded: "" },
  ],
  matches: [],
  matchSeq: 0,
  assetSeq: 3,
  activities: ["系统已载入 Dow3 MVP 互动 Demo"],
};

const money = (value) => `USD ${Number(value).toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
const coin = (value, symbol) => `${Number(value).toLocaleString("en-US", { maximumFractionDigits: 4 })} ${symbol}`;

// ---- 资金 ↔ 资产 撮合派生量 ----
// 一笔资金流水可用于配资的法币 = 已形成法币(fiat) - 已撮合占用
const fundAllocated = (fundId) => state.matches.filter((m) => m.fundId === fundId).reduce((sum, m) => sum + m.amount, 0);
const fundAvailable = (fund) => Math.max(0, (fund.fiat || 0) - fundAllocated(fund.id));
// 一个资产已获配资 / 剩余缺口(以本金为目标)
const assetMatched = (assetId) => state.matches.filter((m) => m.assetId === assetId).reduce((sum, m) => sum + m.amount, 0);
const assetRemaining = (asset) => Math.max(0, asset.amount - assetMatched(asset.id));

// ---- 资产方资质（第三道门）----
// 三维度（实控人 / 企业 / 店铺）同时「通过」才算已过审；任一「不通过」→未过审；否则待审
function qualOverall(asset) {
  const q = asset.qualification;
  if (!q) return "待审";
  const s = [q.controller.status, q.company.status, q.shop.status];
  if (s.includes("不通过")) return "未过审";
  if (s.includes("待补")) return "待审";
  return "已过审";
}
const qualified = (asset) => qualOverall(asset) === "已过审";

// ---- 需求截止日 / 倒计时（第四道：时间门）----
function daysLeft(asset) {
  if (!asset.deadline) return 999;
  return Math.ceil((new Date(asset.deadline + "T23:59:59") - Date.now()) / 86400000);
}
// 紧迫度：expired 已过期 / urgent ≤3天 / soon ≤7天 / ok 充足
function urgency(asset) {
  const d = daysLeft(asset);
  if (d < 0) return "expired";
  if (d <= 3) return "urgent";
  if (d <= 7) return "soon";
  return "ok";
}
// 可进入撮合：资质已过审 且 未过期
const eligibleForMatch = (asset) => qualified(asset) && daysLeft(asset) >= 0;

// ---- 时间窗口（第五道门）----
// 资产期限折算天数：随时可赎回=0（灵活），3个月=90，6个月=180
function tenureDays(asset) {
  if (/随时/.test(asset.tenure)) return 0;
  const m = parseInt(asset.tenure, 10);
  return Number.isNaN(m) ? 0 : m * 30;
}
// 资金窗口是否覆盖资产：起息日 ≤ 资产最晚需求日 且 窗口时长 ≥ 资产期限。未设窗口则不限制。
function timeWindowOk(funder, asset) {
  if (!funder.startDate || !funder.dueDate) return true;
  const sd = new Date(funder.startDate), dd = new Date(funder.dueDate);
  const winDays = (dd - sd) / 86400000;
  const startInTime = !asset.deadline || sd <= new Date(asset.deadline + "T23:59:59");
  return startInTime && winDays >= tenureDays(asset);
}

// ---- 资金方派生量 ----
const funderDeployed = (funderId) => state.matches.filter((m) => m.funderId === funderId).reduce((sum, m) => sum + m.amount, 0);
const funderAvailable = (funder) => Math.max(0, funder.committed - funderDeployed(funder.id));

// ---- 准入规则校验引擎 ----
// 返回每条规则的校验结果，全部通过才可撮合
function checkEligibility(funder, asset, amount) {
  const assetYield = parseFloat(asset.yield);
  return [
    { rule: "资金方状态", pass: funder.status === "活跃", detail: funder.status },
    { rule: "资产类型", pass: funder.eligible.includes(asset.category), detail: `${funder.eligible.join("、")} ← ${asset.category}` },
    { rule: "收益要求", pass: assetYield >= funder.minYield, detail: `要求 ≥${funder.minYield}%，资产 ${asset.yield}` },
    { rule: "单笔额度", pass: amount >= funder.minTicket && amount <= funder.maxTicket, detail: `${money(funder.minTicket)}–${money(funder.maxTicket)}，请求 ${money(amount)}` },
    { rule: "资金期限", pass: funder.tenure.includes(asset.tenure), detail: `接受 ${funder.tenure.join("、")}，资产 ${asset.tenure}` },
    { rule: "可用额度", pass: funderAvailable(funder) >= amount, detail: `可用 ${money(funderAvailable(funder))}，请求 ${money(amount)}` },
    { rule: "资金窗口", pass: timeWindowOk(funder, asset), detail: funder.startDate && funder.dueDate ? `${funder.startDate}~${funder.dueDate} vs 资产需 ${tenureDays(asset)} 天、最晚 ${asset.deadline || "-"}` : "未设窗口（不限制）" },
  ];
}
const isEligible = (funder, asset, amount) => checkEligibility(funder, asset, amount).every((c) => c.pass);

// ---- 匹配建议：对一个待配资产，推荐最优资金方（可行额度感知，支持部分配资）----
// 每家资金方按 feasible = min(缺口, 单笔上限, 可用额度) 评估可投金额；
// 满足 类型/收益/期限 且 feasible ≥ 单笔下限 即入选。评分按「利差」降序，同利差比可投金额。
function recommendFunders(asset, target) {
  const assetYield = parseFloat(asset.yield);
  return state.funders
    .map((fu) => {
      const feasible = Math.min(target, fu.maxTicket, funderAvailable(fu));
      const ok = fu.status === "活跃" && fu.eligible.includes(asset.category) && assetYield >= fu.minYield && fu.tenure.includes(asset.tenure) && timeWindowOk(fu, asset) && feasible >= fu.minTicket && feasible > 0;
      return { funder: fu, ok, spread: Math.round((assetYield - fu.minYield) * 100) / 100, feasible, available: funderAvailable(fu) };
    })
    .filter((o) => o.ok)
    .sort((a, b) => b.spread - a.spread || b.feasible - a.feasible);
}

// 资金方的「可立即配」流动性 = 其名下已到账流水的可用法币之和
const funderLiquidity = (funderId) => state.funds.filter((f) => f.funderId === funderId).reduce((s, f) => s + fundAvailable(f), 0);

// 多家分笔自动拆分：按利差从高到低，依次用各家可行额度填补缺口
function buildSplitPlan(asset) {
  let need = assetRemaining(asset);
  const recs = recommendFunders(asset, need);
  const plan = [];
  for (const r of recs) {
    if (need <= 0) break;
    const cap = Math.min(need, r.funder.maxTicket, funderAvailable(r.funder));
    if (cap < r.funder.minTicket) continue; // 剩余缺口不足该资金方单笔下限
    const liquid = funderLiquidity(r.funder.id);
    const immediate = Math.min(cap, liquid);
    plan.push({ funder: r.funder, alloc: cap, immediate, pending: cap - immediate, spread: r.spread });
    need -= cap;
  }
  return { plan, uncovered: Math.max(0, need) };
}

// 执行方案：仅对「已到账法币」部分生成实际撮合（分摊到该资金方名下流水）
function executePlan(asset, plan) {
  let createdAmt = 0;
  for (const item of plan) {
    let toMatch = item.immediate;
    const funds = state.funds.filter((f) => f.funderId === item.funder.id && fundAvailable(f) > 0);
    for (const fund of funds) {
      if (toMatch <= 0) break;
      const amt = Math.min(toMatch, fundAvailable(fund), assetRemaining(asset));
      if (amt <= 0) continue;
      const id = `MT-${String(++state.matchSeq).padStart(3, "0")}`;
      state.matches.unshift({ id, assetId: asset.id, assetName: asset.name, fundId: fund.id, funderId: fund.funderId || "", amount: amt, time: new Date().toLocaleString("zh-CN", { hour12: false }) });
      toMatch -= amt;
      createdAmt += amt;
    }
  }
  syncAssetStatus(asset);
  renderAssets();
  renderFunders();
  renderMatching();
  return createdAmt;
}

// 撮合满额的资产标记为「已匹配」，否则回落到「待匹配」(资料相关状态不覆盖)
function syncAssetStatus(asset) {
  const fundedStatuses = ["待匹配", "已匹配"];
  if (!fundedStatuses.includes(asset.status)) return;
  asset.status = assetRemaining(asset) === 0 ? "已匹配" : "待匹配";
}

function addActivity(text) {
  state.activities.unshift(`${new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })} · ${text}`);
  renderDashboard();
}

function setView(view) {
  state.currentView = view;
  document.querySelectorAll(".nav-item").forEach((item) => item.classList.toggle("active", item.dataset.view === view));
  document.querySelectorAll(".view").forEach((node) => node.classList.toggle("active", node.id === view));
  document.getElementById("pageTitle").textContent = { dashboard: "工作台", assets: "资产管理", funding: "资金管理", matching: "资金-资产匹配", finance: "财务与磨损", disclosure: "合规与披露" }[view];
}

function renderDashboard() {
  const fiatTotal = state.funds.reduce((sum, item) => sum + item.fiat, 0);
  const assetTotal = state.assets.reduce((sum, item) => sum + item.amount, 0);
  const matchedFundTotal = state.matches.reduce((sum, item) => sum + item.amount, 0);
  const matchedAssets = state.assets.filter((asset) => asset.amount > 0 && assetRemaining(asset) === 0);
  const pendingAssets = state.assets.filter((asset) => assetRemaining(asset) > 0);
  const matchedAssetTotal = matchedAssets.reduce((sum, asset) => sum + asset.amount, 0);
  const pendingAssetTotal = pendingAssets.reduce((sum, asset) => sum + assetRemaining(asset), 0);
  document.getElementById("fiatTotal").textContent = money(fiatTotal);
  document.getElementById("assetTotal").textContent = money(assetTotal);
  document.getElementById("matchedFundTotal").textContent = money(matchedFundTotal);
  document.getElementById("matchedAssetTotal").textContent = money(matchedAssetTotal);
  document.getElementById("matchedAssetCount").textContent = String(matchedAssets.length);
  document.getElementById("pendingAssetTotal").textContent = money(pendingAssetTotal);
  document.getElementById("pendingAssetCount").textContent = String(pendingAssets.length);
  renderTodos();
  document.getElementById("activityList").replaceChildren(
    ...state.activities.slice(0, 6).map((item) => {
      const row = document.createElement("div");
      row.className = "activity-item";
      row.innerHTML = `<strong>${item.split(" · ")[0]}</strong><p>${item.split(" · ").slice(1).join(" · ")}</p>`;
      return row;
    }),
  );
}

let lastTodos = [];
let todoFilter = "all";
function renderTodos() {
  const items = [];
  for (const a of state.assets) {
    const rem = assetRemaining(a);
    if (rem <= 0) continue;
    const u = urgency(a);
    if (u === "expired") items.push({ sev: "urgent", cat: "资产", text: `资产 ${a.name} 已过期（最晚 ${a.deadline}），待配 ${money(rem)} 失效`, view: "assets", assetId: a.id });
    else if (u === "urgent") items.push({ sev: "urgent", cat: "资产", text: `资产 ${a.name} 仅剩 ${daysLeft(a)} 天到期，待配 ${money(rem)}`, view: "assets", assetId: a.id });
    else if (u === "soon") items.push({ sev: "important", cat: "资产", text: `资产 ${a.name} 剩 ${daysLeft(a)} 天到期，待配 ${money(rem)}`, view: "assets", assetId: a.id });
    if (qualOverall(a) !== "已过审") items.push({ sev: "important", cat: "合规", text: `资产 ${a.name} 资质「${qualOverall(a)}」，需完成审核`, view: "assets", assetId: a.id });
    if (/缺|待上传/.test(a.docs)) items.push({ sev: "important", cat: "合规", text: `资产 ${a.name} 资料：${a.docs}，需催办`, view: "assets", assetId: a.id });
    if (eligibleForMatch(a)) {
      const recs = recommendFunders(a, rem).filter((r) => funderLiquidity(r.funder.id) > 0);
      if (recs.length) items.push({ sev: "tip", cat: "匹配", text: `${a.name} 现可撮合，推荐 ${recs[0].funder.name}（利差 ${recs[0].spread}%，可配 ${money(recs[0].feasible)}）`, view: "matching", assetId: a.id });
    }
  }
  for (const f of state.funds) {
    if (f.status !== "法币已到账") {
      const fu = (state.funders.find((x) => x.id === f.funderId) || {}).name || "";
      items.push({ sev: "important", cat: "资金", text: `流水 ${f.id}${fu ? `（${fu}）` : ""} 未到账：${f.status}，资金暂不可用`, view: "funding", tab: "flows" });
    }
  }
  const order = { urgent: 0, important: 1, tip: 2 };
  items.sort((a, b) => order[a.sev] - order[b.sev]);

  const counts = { urgent: 0, important: 0, tip: 0 };
  items.forEach((i) => counts[i.sev]++);

  // 右上角：可点击筛选
  const filters = [["all", "全部", items.length], ["urgent", "紧急", counts.urgent], ["important", "重要", counts.important], ["tip", "提醒", counts.tip]];
  document.getElementById("todoSummary").innerHTML = filters.map(([k, lab, n]) =>
    `<button class="todo-filter ${todoFilter === k ? "active" : ""}" data-filter="${k}">${k === "all" ? "" : `<span class="todo-dot ${k}"></span>`}${lab} ${n}</button>`).join("");

  const filtered = todoFilter === "all" ? items : items.filter((i) => i.sev === todoFilter);
  lastTodos = filtered;
  document.getElementById("todoList").replaceChildren(
    ...(filtered.length ? filtered.map((it, idx) => {
      const row = document.createElement("div");
      row.className = `todo-row ${it.sev}`;
      row.dataset.idx = String(idx);
      row.innerHTML = `<span class="todo-cat cat-${it.cat}">${it.cat}</span><span class="todo-text">${it.text}</span><span class="todo-go">→</span>`;
      return row;
    }) : [Object.assign(document.createElement("div"), { className: "todo-empty", textContent: "该分类暂无事项 🎉" })]),
  );
}

function renderAssets() {
  document.getElementById("assetGrid").replaceChildren(
    ...state.assets.map((item) => {
      const card = document.createElement("article");
      const pillClass = item.category === "LOC" ? "loc" : item.category === "DPL" ? "dpl" : "fast";
      card.className = "asset-card clickable";
      card.dataset.id = item.id;
      const qo = qualOverall(item);
      const qoCls = qo === "已过审" ? "ok" : qo === "未过审" ? "no" : "wait";
      const u = urgency(item);
      const d = daysLeft(item);
      const cdCls = u === "expired" ? "no" : u === "urgent" ? "urgent" : u === "soon" ? "wait" : "ok";
      const cdText = u === "expired" ? "已过期" : `剩 ${d} 天`;
      card.innerHTML = `
        <header><span class="pill ${pillClass}">${item.category}</span><span>${item.status}</span></header>
        <h3>${item.name}</h3>
        <p>${item.category} 资产，已进入第一版资产台账。</p>
        <dl>
          <div><dt>本金</dt><dd>${money(item.amount)}</dd></div>
          <div><dt>收益率</dt><dd>${item.yield}</dd></div>
          <div><dt>缺口</dt><dd>${assetRemaining(item) ? money(assetRemaining(item)) : "已配齐"}</dd></div>
          <div><dt>资质</dt><dd><span class="qual-tag ${qoCls}">${qo}</span></dd></div>
          <div><dt>最晚需求</dt><dd>${item.deadline || "-"} <span class="cd ${cdCls}">${cdText}</span></dd></div>
        </dl>`;
      return card;
    }),
  );
}

let fundFilter = "all";
function renderFunds() {
  // 状态筛选 chips（含各状态计数）
  const counts = {};
  state.funds.forEach((f) => { counts[f.status] = (counts[f.status] || 0) + 1; });
  const statuses = ["稳定币待打款", "稳定币已到账", "稳定币换汇中", "法币已形成", "法币待提现", "法币已到账"].filter((s) => counts[s]);
  const chips = [["all", "全部", state.funds.length], ...statuses.map((s) => [s, s, counts[s]])];
  const filterEl = document.getElementById("flowFilter");
  if (filterEl) {
    filterEl.innerHTML = chips.map(([k, lab, n]) => `<button class="flow-chip ${fundFilter === k ? "active" : ""}" data-status="${k}">${lab} ${n}</button>`).join("");
  }

  const rows = fundFilter === "all" ? state.funds : state.funds.filter((f) => f.status === fundFilter);
  document.getElementById("fundTable").replaceChildren(
    ...(rows.length ? rows.map((item) => {
      const row = document.createElement("tr");
      row.className = "clickable";
      row.dataset.id = item.id;
      const statusClass = item.status === "法币已到账" ? "received" : item.status === "稳定币换汇中" ? "convert" : "pending";
      const funderName = item.funderId ? (state.funders.find((f) => f.id === item.funderId) || {}).name || "-" : "-";
      row.innerHTML = `
        <td>${item.id}</td>
        <td style="color:var(--muted);font-size:13px">${funderName}</td>
        <td>${coin(item.amount, item.coin)}</td>
        <td>${item.network}</td>
        <td><span class="status ${statusClass}">${item.status}</span></td>
        <td>${item.fiat ? money(item.fiat) : "-"}</td>
        <td><button class="secondary advance-fund" data-id="${item.id}">推进状态</button></td>`;
      return row;
    }) : [Object.assign(document.createElement("tr"), { innerHTML: `<td colspan="7" style="color:var(--muted)">该状态暂无流水。</td>` })]),
  );
}

function renderFunders() {
  const active = state.funders.filter((f) => f.status === "活跃");
  const totalCommitted = state.funders.reduce((s, f) => s + f.committed, 0);
  const totalDeployed = state.funders.reduce((s, f) => s + funderDeployed(f.id), 0);
  document.getElementById("funderCount").textContent = `${active.length} 家`;
  document.getElementById("funderCommitted").textContent = money(totalCommitted);
  document.getElementById("funderDeployed").textContent = money(totalDeployed);
  document.getElementById("funderFree").textContent = money(totalCommitted - totalDeployed);

  document.getElementById("funderGrid").replaceChildren(
    ...state.funders.map((f) => {
      const deployed = funderDeployed(f.id);
      const avail = funderAvailable(f);
      const pct = f.committed ? Math.round((deployed / f.committed) * 100) : 0;
      const card = document.createElement("article");
      card.className = `funder-card clickable${f.status === "活跃" ? "" : " funder-disabled"}`;
      card.dataset.id = f.id;
      card.innerHTML = `
        <header>
          <div><span class="pill funder-pill">${f.type}</span></div>
          <span class="funder-status ${f.status === "活跃" ? "active" : "paused"}">${f.status}</span>
        </header>
        <h3>${f.name}</h3>
        <p>联系人：${f.contact}</p>
        <div class="funder-rules">
          <span class="rule-tag">可配：${f.eligible.join("、")}</span>
          <span class="rule-tag">收益 ≥${f.minYield}%</span>
          <span class="rule-tag">期限：${f.tenure.join("、")}</span>
        </div>
        ${f.startDate || f.dueDate ? `<p class="funder-window">🗓 资金窗口：${f.startDate || "-"} 起息 → ${f.dueDate || "-"} 还款</p>` : ""}
        <div class="funder-bar-wrap">
          <div class="funder-bar-labels"><span>已部署 ${money(deployed)}</span><span>可用 ${money(avail)}</span></div>
          <div class="funder-bar"><div class="funder-bar-fill" style="width:${pct}%"></div></div>
        </div>
        <dl>
          <div><dt>承诺额度</dt><dd>${money(f.committed)}</dd></div>
          <div><dt>单笔范围</dt><dd>${money(f.minTicket)} – ${money(f.maxTicket)}</dd></div>
        </dl>`;
      return card;
    }),
  );
}

function openFunderDetail(funderId) {
  const funder = state.funders.find((f) => f.id === funderId);
  if (!funder) return;
  const deployed = funderDeployed(funder.id);
  const avail = funderAvailable(funder);
  // 哪些资产符合这个资金方的准入（用资产本金做默认金额判断）
  const eligibleAssets = state.assets.filter((a) => isEligible(funder, a, a.amount));
  // 名下流水
  const flows = state.funds.filter((fl) => fl.funderId === funder.id);

  document.getElementById("assetDialogTitle").textContent = funder.name;
  let html = funder.note ? `<div class="detail-note" style="background:#e8f1f9;color:var(--blue);margin-bottom:4px">${funder.note}</div>` : "";
  html += [
    ["类型", funder.type],
    ["联系人", funder.contact],
    ["状态", funder.status],
    ["承诺额度", money(funder.committed)],
    ["已部署", money(deployed)],
    ["可用额度", money(avail)],
    ["可配资产类型", funder.eligible.join("、")],
    ["最低收益要求", `≥ ${funder.minYield}%`],
    ["单笔额度范围", `${money(funder.minTicket)} – ${money(funder.maxTicket)}`],
    ["资金期限偏好", funder.tenure.join("、")],
    ["起息日", funder.startDate || "-"],
    ["还款日", funder.dueDate || "-"],
  ].map(([k, v]) => `<div><span>${k}</span><strong>${v}</strong></div>`).join("");

  if (eligibleAssets.length) {
    html += `<div class="detail-section-label">符合准入的资产（${eligibleAssets.length} 项）</div>`;
    html += eligibleAssets.map((a) => `<div><span>${a.name}</span><strong>${a.category} · ${a.yield} · ${a.tenure}</strong></div>`).join("");
  } else {
    html += `<div class="detail-note">当前没有同时满足全部准入规则的资产。</div>`;
  }

  if (flows.length) {
    html += `<div class="detail-section-label">名下资金流水（${flows.length} 笔）</div>`;
    html += flows.map((fl) => `<div><span>${fl.id}</span><strong>${fl.status}</strong></div>`).join("");
  }

  // 已配资产明细（feature 1）
  const myMatches = state.matches.filter((m) => m.funderId === funder.id);
  if (myMatches.length) {
    html += `<div class="detail-section-label">已配资产明细（${myMatches.length} 笔，共 ${money(deployed)}）</div>`;
    html += myMatches.map((m) => `<div><span>${m.assetName} · ${m.fundId}</span><strong>${money(m.amount)}</strong></div>`).join("");
  }

  document.getElementById("assetDialogBody").innerHTML = html;
  const pending = avail > 0 && eligibleAssets.length > 0 && funder.status === "活跃";
  document.getElementById("assetDialogActions").innerHTML = `
    ${pending ? `<button class="primary" id="funderToMatch" data-id="${funder.id}">去撮合</button>` : ""}
    <button class="secondary" id="funderEdit" data-id="${funder.id}">编辑</button>
    <button class="secondary" id="funderToggle" data-id="${funder.id}">${funder.status === "活跃" ? "停用" : "启用"}</button>
    <button class="secondary" id="assetDetailDone">关闭</button>`;
  { const _d = document.getElementById("assetDialog"); if (!_d.open) _d.showModal(); }
}

function renderMatching() {
  const totalAvailable = state.funds.reduce((sum, fund) => sum + fundAvailable(fund), 0);
  const totalGap = state.assets.reduce((sum, asset) => sum + assetRemaining(asset), 0);
  const totalPrincipal = state.assets.reduce((sum, asset) => sum + asset.amount, 0);
  const matchedPrincipal = state.assets.reduce((sum, asset) => sum + assetMatched(asset.id), 0);
  const coverage = totalPrincipal ? (matchedPrincipal / totalPrincipal) * 100 : 0;
  document.getElementById("matchAvailable").textContent = money(totalAvailable);
  document.getElementById("matchGap").textContent = money(totalGap);
  document.getElementById("matchCount").textContent = String(state.matches.length);
  document.getElementById("matchCoverage").textContent = `${coverage.toFixed(1)}%`;

  const tbody = document.getElementById("matchTable");
  if (!state.matches.length) {
    const empty = document.createElement("tr");
    empty.innerHTML = `<td colspan="6" style="color:var(--muted)">暂无撮合记录，点击「新建撮合」把已到账法币配给待匹配资产。</td>`;
    tbody.replaceChildren(empty);
    return;
  }
  tbody.replaceChildren(
    ...state.matches.map((item) => {
      const row = document.createElement("tr");
      const mFunder = item.funderId ? (state.funders.find((f) => f.id === item.funderId) || {}).name || "-" : "-";
      row.innerHTML = `
        <td>${item.id}</td>
        <td>${item.assetName}</td>
        <td>${item.fundId}</td>
        <td style="color:var(--muted);font-size:13px">${mFunder}</td>
        <td>${money(item.amount)}</td>
        <td>${item.time}</td>
        <td><button class="secondary unmatch" data-id="${item.id}">解除</button></td>`;
      return row;
    }),
  );
}

function renderCosts() {
  document.getElementById("costTable").replaceChildren(
    ...state.costs.map((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${item.type}</td><td>${item.original}</td><td>${item.reporting}</td><td>${item.source}</td>`;
      return row;
    }),
  );
}

const DOC_DONE = ["已归档", "已上传", "已完成", "已签署"];
const docIncomplete = (status) => !DOC_DONE.includes(status);
const docOwner = (scope) => (scope === "fund" ? "资方 / 法务对接人" : "资产方对接人");

function renderMaterialContext(asset) {
  const el = document.getElementById("materialContextBanner");
  if (!el) return;
  if (!asset) { el.innerHTML = ""; return; }
  const q = asset.qualification;
  const dims = q ? `实控人「${q.controller.status}」· 企业「${q.company.status}」· 店铺「${q.shop.status}」` : "";
  el.innerHTML = `
    <div class="material-context">
      <div>
        <strong>📎 正在查看 ${asset.name} 的资质审核材料</strong>
        <p>${dims}</p>
        <span class="material-future">合同管理系统对接后，将深链至该资产的专属材料包（征信报告 / 营业执照 / GMV 报表 / 店铺后台等）。</span>
      </div>
      <button class="secondary" id="materialContextClear">清除</button>
    </div>`;
}

function renderDisclosureMetrics() {
  const allDocs = [...state.fundDocs, ...state.assetDocs];
  const total = allDocs.length;
  const gaps = allDocs.filter((d) => docIncomplete(d.status)).length;
  const reminded = allDocs.filter((d) => d.reminded).length;
  const fundComplete = state.fundDocs.filter((d) => !docIncomplete(d.status)).length;
  const assetComplete = state.assetDocs.filter((d) => !docIncomplete(d.status)).length;
  document.getElementById("contractCoverage").textContent = `${fundComplete}/${state.fundDocs.length} 份`;
  document.getElementById("docCompleteness").textContent = `${assetComplete}/${state.assetDocs.length} 份`;
  document.getElementById("docGapCount").textContent = `${gaps} 项`;
  document.getElementById("remindedCount").textContent = `${reminded} 项`;
}

function renderDocs() {
  const render = (id, scope, docs) => document.getElementById(id).replaceChildren(...docs.map((doc, index) => {
    const item = document.createElement("li");
    item.className = "doc-item clickable";
    item.dataset.scope = scope;
    item.dataset.index = String(index);
    const pending = docIncomplete(doc.status);
    item.innerHTML = `<span>${doc.name}</span><strong class="${pending ? "pending-doc" : ""}">${doc.status}${doc.reminded ? " · 已催办" : ""}</strong>`;
    return item;
  }));
  render("fundDocs", "fund", state.fundDocs);
  render("assetDocs", "asset", state.assetDocs);
  renderDisclosureMetrics();
}

function calculateCost() {
  const currency = document.getElementById("calcCurrency").value;
  const amount = Number(document.getElementById("calcAmount").value || 0);
  const feeRate = Number(document.getElementById("calcFee").value || 0) / 100;
  const rate = Number(document.getElementById("calcRate").value || 0);
  const platformFee = amount * feeRate;
  const netSell = amount - platformFee;
  const actualUsd = netSell * rate;
  const rateLoss = netSell * (1 - rate);
  document.getElementById("platformFee").textContent = coin(platformFee, currency);
  document.getElementById("netSell").textContent = coin(netSell, currency);
  document.getElementById("actualUsd").textContent = money(actualUsd);
  document.getElementById("rateLoss").textContent = money(rateLoss);
  return { currency, platformFee, rateLoss };
}

function openDialog(type, editId) {
  const dialog = document.getElementById("recordDialog");
  const fields = document.getElementById("dialogFields");
  document.getElementById("recordForm").dataset.type = type;
  document.getElementById("recordForm").dataset.editId = "";
  document.getElementById("dialogTitle").textContent = type === "asset" ? "新增资产" : type === "doc" ? "上传资料" : type === "match" ? "新建匹配" : type === "funder" ? "新增资金方" : "新增资金流转";
  if (type === "funder") {
    const f = editId ? state.funders.find((x) => x.id === editId) : null;
    if (f) {
      document.getElementById("dialogTitle").textContent = `编辑资金方 · ${f.name}`;
      document.getElementById("recordForm").dataset.editId = f.id;
    }
    const chk = (arr, v) => (f ? (arr.includes(v) ? "checked" : "") : (v === "LOC" || v === "DPL" || v === "3个月" || v === "6个月" ? "checked" : ""));
    document.getElementById("submitRecord").disabled = false;
    fields.innerHTML = `
      <label>资金方名称<input name="name" value="${f ? f.name : "新资金方"}" /></label>
      <label>类型<input name="type" value="${f ? f.type : "机构 LP"}" /></label>
      <label>联系人<input name="contact" value="${f ? f.contact : "对接人"}" /></label>
      <div class="field-group">
        <span class="field-label">可配资产类型</span>
        <div class="check-row">
          <label class="check-inline"><input type="checkbox" name="eligible" value="LOC" ${chk(f ? f.eligible : [], "LOC")} /> LOC</label>
          <label class="check-inline"><input type="checkbox" name="eligible" value="DPL" ${chk(f ? f.eligible : [], "DPL")} /> DPL</label>
          <label class="check-inline"><input type="checkbox" name="eligible" value="Fast Pay" ${chk(f ? f.eligible : [], "Fast Pay")} /> Fast Pay</label>
        </div>
      </div>
      <label>最低收益要求 (%)<input name="minYield" type="number" step="0.1" value="${f ? f.minYield : 12}" /></label>
      <label>单笔最小金额<input name="minTicket" type="number" value="${f ? f.minTicket : 50000}" /></label>
      <label>单笔最大金额<input name="maxTicket" type="number" value="${f ? f.maxTicket : 500000}" /></label>
      <div class="field-group">
        <span class="field-label">资金期限偏好</span>
        <div class="check-row">
          <label class="check-inline"><input type="checkbox" name="tenure" value="随时可赎回" ${chk(f ? f.tenure : [], "随时可赎回")} /> 随时可赎回</label>
          <label class="check-inline"><input type="checkbox" name="tenure" value="3个月" ${chk(f ? f.tenure : [], "3个月")} /> 3个月</label>
          <label class="check-inline"><input type="checkbox" name="tenure" value="6个月" ${chk(f ? f.tenure : [], "6个月")} /> 6个月</label>
        </div>
      </div>
      <label>承诺额度<input name="committed" type="number" value="${f ? f.committed : 500000}" /></label>
      <label>起息日<input name="startDate" type="date" value="${f ? f.startDate || "" : ""}" /></label>
      <label>还款日<input name="dueDate" type="date" value="${f ? f.dueDate || "" : ""}" /></label>`;
    dialog.showModal();
    return;
  }
  if (type === "match") {
    const openAssets = state.assets.filter((asset) => assetRemaining(asset) > 0 && eligibleForMatch(asset));
    const openFunds = state.funds.filter((fund) => fundAvailable(fund) > 0);
    if (!openAssets.length || !openFunds.length) {
      fields.innerHTML = `<p style="color:var(--muted)">${!openFunds.length ? "暂无可用法币：请先在「资金流转」把流水推进到「法币已到账」。" : "暂无可撮合的资产：资产已全部配齐，或存在缺口但资质未过审（撮合需资质已过审）。"}</p>`;
      document.getElementById("submitRecord").disabled = true;
      dialog.showModal();
      return;
    }
    document.getElementById("submitRecord").disabled = false;

    // 初始建议金额 = 最优推荐资金方的可行金额（默认即落在准入范围内）
    const suggestedAmount = (asset) => {
      const r = recommendFunders(asset, assetRemaining(asset));
      return r[0] ? r[0].feasible : assetRemaining(asset);
    };
    const firstAsset = openAssets[0];
    const defaultAmount = suggestedAmount(firstAsset);

    // 资金方准入筛选（根据当前选中资产动态生成）
    const buildFunderOptions = (asset, amount) => state.funders.map((fu) => {
      const checks = checkEligibility(fu, asset, amount);
      const allPass = checks.every((c) => c.pass);
      const failReasons = checks.filter((c) => !c.pass).map((c) => c.detail).join("；");
      return { fu, allPass, failReasons };
    });

    // 资金流水筛选：只显示通过准入的资金方名下的流水
    const buildFundOptions = (asset, amount) => {
      const eligibleFunderIds = state.funders.filter((fu) => isEligible(fu, asset, amount)).map((fu) => fu.id);
      return openFunds.filter((f) => eligibleFunderIds.includes(f.funderId));
    };

    const renderMatchFields = (assetId, amount) => {
      const asset = state.assets.find((a) => a.id === assetId);
      const funderOpts = buildFunderOptions(asset, amount);
      const fundOpts = buildFundOptions(asset, amount);
      const eligibleCount = funderOpts.filter((o) => o.allPass).length;
      // 推荐：在「按当前金额通过全部准入」的资金方里，挑利差最高的
      const ay = parseFloat(asset.yield);
      const passing = funderOpts.filter((o) => o.allPass && funderLiquidity(o.fu.id) > 0).map((o) => ({ fu: o.fu, spread: Math.round((ay - o.fu.minYield) * 100) / 100 })).sort((a, b) => b.spread - a.spread);
      const bestId = passing[0] ? passing[0].fu.id : null;
      const bestSpread = passing[0] ? passing[0].spread : 0;

      const funderHtml = funderOpts.map(({ fu, allPass, failReasons }) => {
        const illiquid = allPass && funderLiquidity(fu.id) <= 0;
        return `<div class="funder-check ${allPass ? (illiquid ? "warn" : "pass") : "fail"}">
          <span>${allPass ? (illiquid ? "⚠️" : "✅") : "❌"} ${fu.name}${allPass && !illiquid && fu.id === bestId ? ' <em class="rec-badge">⭐ 推荐</em>' : ""}</span>
          <small>${allPass ? (illiquid ? "准入通过，但暂无已到账法币流水，不可选（需先在「资金管理」录入并推进到「法币已到账」）" : `${fu.eligible.join("、")} · ≥${fu.minYield}% · ${fu.tenure.join("、")}${fu.id === bestId ? ` · 利差 ${bestSpread}%` : ""}`) : `不符合：${failReasons}`}</small>
        </div>`;
      }).join("");

      const fundSelectHtml = fundOpts.length
        ? `<label>资金流水（已过滤准入）<select name="fundId">${fundOpts.map((f) => {
            const fu = state.funders.find((fu) => fu.id === f.funderId);
            return `<option value="${f.id}">${f.id}${fu ? ` · ${fu.name}` : ""} · 可用 ${money(fundAvailable(f))}</option>`;
          }).join("")}</select></label>`
        : `<p class="match-warn">⚠️ ${eligibleCount > 0
            ? "通过准入的资金方暂无「已到账法币」可用：其资金流水尚未形成法币，请到「资金管理 → 资金流转」把对应流水推进到「法币已到账」后再来匹配。"
            : "当前无资金方通过全部准入规则，请调整金额、调整资产期限或先补充资料。"}</p>`;

      const rem = assetRemaining(asset);
      const sug = suggestedAmount(asset);
      const leftover = rem - amount;
      let hint;
      if (amount > rem) hint = `<span class="warn">⚠️ 配资金额超过缺口 ${money(rem)}。</span>`;
      else if (leftover === 0) hint = `本笔将配满缺口 ${money(rem)}。`;
      else if (amount === sug) hint = `💡 已填入<strong>推荐金额</strong>（最优资金方单笔可配 ${money(amount)}）；剩余 <strong>${money(leftover)}</strong> 待另配，可用「一键采纳推荐」分笔补足。`;
      else hint = `本笔配 ${money(amount)}，剩余 <strong>${money(leftover)}</strong> 待另配。`;

      fields.innerHTML = `
        <label>待配资产<select name="assetId">${openAssets.map((a) =>
          `<option value="${a.id}" ${a.id === assetId ? "selected" : ""}>${a.name} · ${a.category} · ${a.yield} · ${a.tenure} · 缺口 ${money(assetRemaining(a))}</option>`).join("")}</select></label>
        <label>配资金额<input name="amount" type="number" min="0" value="${amount}" /></label>
        <p class="match-hint">${hint}</p>
        <div class="funder-check-group"><div class="funder-check-label">资金方准入校验（${eligibleCount}/${funderOpts.length} 通过）</div>${funderHtml}</div>
        ${fundSelectHtml}`;

      // Re-bind change events
      const assetSel = fields.querySelector("[name=assetId]");
      const amtInput = fields.querySelector("[name=amount]");
      const rerender = () => renderMatchFields(assetSel.value, Number(amtInput.value) || assetRemaining(state.assets.find((a) => a.id === assetSel.value)));
      assetSel.addEventListener("change", () => {
        const a = state.assets.find((x) => x.id === assetSel.value);
        const sug = suggestedAmount(a);
        amtInput.value = sug;
        renderMatchFields(assetSel.value, sug);
      });
      amtInput.addEventListener("input", rerender);
    };

    renderMatchFields(firstAsset.id, defaultAmount);
    document.getElementById("submitRecord").disabled = false;
    dialog.showModal();
    return;
  }
  if (type === "asset") {
    fields.innerHTML = `
      <label>资产名称<input name="name" value="LOC-New-001" /></label>
      <label>产品类别<select name="category"><option>LOC</option><option>DPL</option><option>Fast Pay</option></select></label>
      <label>本金金额<input name="amount" type="number" value="250000" /></label>
      <label>收益率<input name="yield" value="12.5%" /></label>`;
  } else if (type === "doc") {
    fields.innerHTML = `<label>文件名称<input name="name" value="补充协议" /></label><label>资料归属<select name="scope"><option value="fund">资方合同</option><option value="asset">资产形成资料</option></select></label>`;
  } else {
    fields.innerHTML = `
      <label>流水号<input name="id" value="FR-2026-0527-NEW" /></label>
      <label>所属资金方<select name="funderId">${state.funders.map((f) => `<option value="${f.id}">${f.name}</option>`).join("")}</select></label>
      <label>稳定币<select name="coin"><option>USDT</option><option>USDC</option></select></label>
      <label>金额<input name="amount" type="number" value="100000" /></label>
      <label>网络<select name="network"><option>Tron</option><option>Ethereum</option><option>Polygon</option></select></label>
      <label>状态<select name="status"><option>稳定币待打款</option><option>稳定币已到账</option><option>稳定币换汇中</option><option>法币已到账</option></select></label>`;
  }
  dialog.showModal();
}

function openAssetDetail(assetId) {
  const asset = state.assets.find((a) => a.id === assetId);
  if (!asset) return;
  const matched = assetMatched(asset.id);
  const remaining = assetRemaining(asset);
  const lacking = asset.status === "资料缺失" || asset.status === "待复核" || /缺|待上传/.test(asset.docs);
  document.getElementById("assetDialogTitle").textContent = asset.name;

  const d = daysLeft(asset);
  const cdText = d < 0 ? "已过期" : `剩 ${d} 天`;
  const rows = [
    ["产品类别", asset.category],
    ["状态", asset.status],
    ["本金", money(asset.amount)],
    ["收益率", asset.yield],
    ["已配资", money(matched)],
    ["缺口", remaining ? money(remaining) : "已配齐"],
    ["最晚需求日", `${asset.deadline || "-"}（${cdText}）`],
    ["申请人", asset.applicant || "待指派"],
    ["资料", asset.docs],
  ];
  let html = rows.map(([k, v]) => `<div><span>${k}</span><strong>${v}</strong></div>`).join("");
  if (lacking) {
    html += `<div class="detail-note">资料不完整，需申请人补齐后才能进入正式撮合。${asset.reminded ? `<br/><em>已于 ${asset.reminded} 发送提醒 / 任务</em>` : ""}</div>`;
  }

  // 资产方资质（第三道门）
  const qo = qualOverall(asset);
  const q = asset.qualification;
  if (q) {
    const dimCls = (s) => (s === "通过" ? "ok" : s === "不通过" ? "no" : "wait");
    html += `<div class="detail-section-label">资产方资质审核 · ${qo}</div>`;
    html += `<div class="qual-dim ${dimCls(q.controller.status)}"><div class="qual-dim-head"><span>① 实控人</span><strong>${q.controller.status}</strong></div><small>${q.controller.nationality} · ${q.controller.identity} · ${q.controller.credit}</small></div>`;
    html += `<div class="qual-dim ${dimCls(q.company.status)}"><div class="qual-dim-head"><span>② 企业</span><strong>${q.company.status}</strong></div><small>${q.company.age} · ${q.company.type} · ${q.company.ltmGmv} · ${q.company.entity}</small></div>`;
    html += `<div class="qual-dim ${dimCls(q.shop.status)}"><div class="qual-dim-head"><span>③ 店铺</span><strong>${q.shop.status}</strong></div><small>${q.shop.returnRate} · ${q.shop.repayRate} · ${q.shop.closeRate} · ${q.shop.platform}</small></div>`;
  }

  // 已配资明细（feature 1）
  const myMatches = state.matches.filter((m) => m.assetId === asset.id);
  if (myMatches.length) {
    html += `<div class="detail-section-label">已配资明细（${myMatches.length} 笔）</div>`;
    html += myMatches.map((m) => {
      const fu = m.funderId ? (state.funders.find((f) => f.id === m.funderId) || {}).name || "-" : "-";
      return `<div><span>${m.fundId} · ${fu}</span><strong>${money(m.amount)}</strong></div>`;
    }).join("");
  }

  // 匹配建议（需资质已过审 且 未过期）
  const matchAmount = remaining || asset.amount;
  const recs = eligibleForMatch(asset) ? recommendFunders(asset, matchAmount) : [];
  if (d < 0) {
    html += `<div class="detail-note" style="background:#f0f1f3;color:#5a6470">⛔ 资产已过期（最晚需求日 ${asset.deadline}），客户资金需求已失效，不再进入撮合。</div>`;
  } else if (!qualified(asset)) {
    html += `<div class="detail-note" style="background:#fcefde;color:var(--orange)">⛔ 资产方资质为「${qo}」，未过审前不可进入撮合。请先完成三维度资质审核。</div>`;
  } else if (recs.length) {
    const best = recs[0];
    const partial = best.feasible < matchAmount;
    html += `<div class="detail-note" style="background:#e6f4ec;color:var(--green)">💡 推荐资金方：<strong>${best.funder.name}</strong> —— 资产收益 ${asset.yield} 对其要求 ≥${best.funder.minYield}%，利差最高 <strong>${best.spread}%</strong>，可配 <strong>${money(best.feasible)}</strong>${partial ? `（缺口 ${money(matchAmount)}，需分笔/多家补足）` : ""}。</div>`;
    html += `<div class="detail-section-label">匹配建议（按利差排序，${recs.length} 家可配）</div>`;
    html += recs.map((r, i) => `<div class="rec-row${i === 0 ? " rec-top" : ""}">
      <span>${i === 0 ? "⭐ " : `${i + 1}. `}${r.funder.name}</span>
      <strong>利差 ${r.spread}% · 可配 ${money(r.feasible)}</strong>
    </div>`).join("");
  } else if (remaining > 0) {
    html += `<div class="detail-note" style="background:#f0f4ff;color:#2c5f8f">暂无资金方同时满足全部准入规则（类型 / 收益 / 期限 / 金额 / 额度），无法给出匹配建议。</div>`;
  }
  document.getElementById("assetDialogBody").innerHTML = html;

  const buttons = [];
  if (lacking) {
    buttons.push(`<button class="primary" id="assetRemind" data-id="${asset.id}">${asset.reminded ? "再次提醒申请人" : "发送补件提醒 / 任务"}</button>`);
  }
  if (eligibleForMatch(asset) && remaining > 0) {
    if (recs.length) buttons.push(`<button class="primary" id="assetAdoptPlan" data-id="${asset.id}">一键采纳推荐</button>`);
    buttons.push(`<button class="secondary" id="assetToMatch" data-id="${asset.id}">手动撮合</button>`);
  }
  if (asset.qualification) buttons.push(`<button class="secondary" id="qualToDisclosure" data-id="${asset.id}">查看审核材料</button>`);
  buttons.push(`<button class="secondary" id="assetDetailDone">关闭</button>`);
  document.getElementById("assetDialogActions").innerHTML = buttons.join("");
  { const _d = document.getElementById("assetDialog"); if (!_d.open) _d.showModal(); }
}

function openSplitPlanPreview(assetId) {
  const asset = state.assets.find((a) => a.id === assetId);
  if (!asset) return;
  const need = assetRemaining(asset);
  const { plan, uncovered } = buildSplitPlan(asset);
  const immediateTotal = plan.reduce((s, p) => s + p.immediate, 0);
  const pendingTotal = plan.reduce((s, p) => s + p.pending, 0);

  document.getElementById("assetDialogTitle").textContent = `分笔方案 · ${asset.name}`;
  let html = `<div class="detail-note" style="background:#e6f4ec;color:var(--green)">缺口 ${money(need)}，按利差从高到低自动拆分为 ${plan.length} 笔：</div>`;
  if (plan.length) {
    html += plan.map((p, i) => `<div class="rec-row${i === 0 ? " rec-top" : ""}">
      <span>${i + 1}. ${p.funder.name}</span>
      <strong>配 ${money(p.alloc)} · 利差 ${p.spread}%${p.pending > 0 ? ` · 含待到账 ${money(p.pending)}` : ""}</strong>
    </div>`).join("");
  } else {
    html += `<div class="detail-note">无符合准入的资金方，无法生成方案。</div>`;
  }
  html += `<div class="detail-section-label">方案汇总</div>`;
  html += `<div><span>✅ 可立即撮合</span><strong>${money(immediateTotal)}</strong></div>`;
  if (pendingTotal > 0) html += `<div><span>⏳ 待资金到账（暂不生成）</span><strong>${money(pendingTotal)}</strong></div>`;
  if (uncovered > 0) html += `<div><span>⚠️ 仍缺口（无更多可配资金方）</span><strong>${money(uncovered)}</strong></div>`;
  document.getElementById("assetDialogBody").innerHTML = html;

  document.getElementById("assetDialogActions").innerHTML = `
    ${immediateTotal > 0 ? `<button class="primary" id="confirmPlan" data-id="${asset.id}">确认采纳（生成 ${money(immediateTotal)} 撮合）</button>` : ""}
    <button class="secondary" id="backToDetail" data-id="${asset.id}">返回</button>`;
  const d = document.getElementById("assetDialog");
  if (!d.open) d.showModal();
}

function openDocDetail(scope, index) {
  const list = scope === "fund" ? state.fundDocs : state.assetDocs;
  const doc = list[index];
  if (!doc) return;
  const pending = docIncomplete(doc.status);
  document.getElementById("assetDialogTitle").textContent = doc.name;
  const rows = [
    ["归属", scope === "fund" ? "资方合同" : "资产形成资料"],
    ["状态", doc.status],
    ["责任方", docOwner(scope)],
  ];
  let html = rows.map(([k, v]) => `<div><span>${k}</span><strong>${v}</strong></div>`).join("");
  if (pending) {
    html += `<div class="detail-note">该资料未完成（${doc.status}），需责任方补齐 / 签署后才能进入披露。${doc.reminded ? `<br/><em>已于 ${doc.reminded} 发起催办</em>` : ""}</div>`;
  }
  document.getElementById("assetDialogBody").innerHTML = html;
  const buttons = [];
  if (pending) buttons.push(`<button class="primary" id="docRemind" data-scope="${scope}" data-index="${index}">${doc.reminded ? "再次催办" : "形成催办并发送"}</button>`);
  buttons.push(`<button class="secondary" id="assetDetailDone">关闭</button>`);
  document.getElementById("assetDialogActions").innerHTML = buttons.join("");
  { const _d = document.getElementById("assetDialog"); if (!_d.open) _d.showModal(); }
}

function openFundDetail(fundId) {
  const fund = state.funds.find((f) => f.id === fundId);
  if (!fund) return;
  const pending = fund.status !== "法币已到账";
  document.getElementById("assetDialogTitle").textContent = fund.id;
  const rows = [
    ["稳定币", coin(fund.amount, fund.coin)],
    ["网络", fund.network],
    ["状态", fund.status],
    ["形成法币", fund.fiat ? money(fund.fiat) : "-"],
    ["可用法币", money(fundAvailable(fund))],
    ["责任方", "资金运营 / 财务"],
  ];
  let html = rows.map(([k, v]) => `<div><span>${k}</span><strong>${v}</strong></div>`).join("");
  if (pending) {
    html += `<div class="detail-note">资金尚未到账（${fund.status}），可催办对应环节加快处理。${fund.reminded ? `<br/><em>已于 ${fund.reminded} 发起催办</em>` : ""}</div>`;
  }
  document.getElementById("assetDialogBody").innerHTML = html;
  const buttons = [];
  if (pending) buttons.push(`<button class="primary" id="fundRemind" data-id="${fund.id}">${fund.reminded ? "再次催办" : "形成催办并发送"}</button>`);
  buttons.push(`<button class="secondary" id="assetDetailDone">关闭</button>`);
  document.getElementById("assetDialogActions").innerHTML = buttons.join("");
  { const _d = document.getElementById("assetDialog"); if (!_d.open) _d.showModal(); }
}

document.getElementById("assetGrid").addEventListener("click", (event) => {
  const card = event.target.closest(".asset-card");
  if (card) openAssetDetail(card.dataset.id);
});
["fundDocs", "assetDocs"].forEach((id) => document.getElementById(id).addEventListener("click", (event) => {
  const item = event.target.closest(".doc-item");
  if (item) openDocDetail(item.dataset.scope, Number(item.dataset.index));
}));
document.getElementById("assetDialogClose").addEventListener("click", () => document.getElementById("assetDialog").close());
document.getElementById("assetDialogActions").addEventListener("click", (event) => {
  const target = event.target.closest("button");
  if (!target) return;
  if (target.id === "qualToDisclosure") {
    const a = state.assets.find((x) => x.id === target.dataset.id);
    document.getElementById("assetDialog").close();
    renderMaterialContext(a || null);
    setView("disclosure");
    addActivity(`查看资质审核材料：${a ? a.name : ""}`);
  } else if (target.id === "assetDetailDone") {
    document.getElementById("assetDialog").close();
  } else if (target.id === "assetRemind") {
    const asset = state.assets.find((a) => a.id === target.dataset.id);
    asset.reminded = new Date().toLocaleString("zh-CN", { hour12: false });
    addActivity(`已向 ${asset.applicant} 发送补件提醒 / 任务：${asset.name}（${asset.docs}）`);
    document.getElementById("assetDialog").close();
  } else if (target.id === "assetToMatch" || target.id === "funderToMatch") {
    document.getElementById("assetDialog").close();
    setView("matching");
    openDialog("match");
  } else if (target.id === "assetAdoptPlan") {
    openSplitPlanPreview(target.dataset.id);
  } else if (target.id === "backToDetail") {
    openAssetDetail(target.dataset.id);
  } else if (target.id === "confirmPlan") {
    const asset = state.assets.find((a) => a.id === target.dataset.id);
    const { plan } = buildSplitPlan(asset);
    const created = executePlan(asset, plan);
    addActivity(`一键采纳分笔方案：${asset.name} 生成撮合 ${money(created)}`);
    document.getElementById("assetDialog").close();
  } else if (target.id === "funderEdit") {
    document.getElementById("assetDialog").close();
    openDialog("funder", target.dataset.id);
  } else if (target.id === "funderToggle") {
    const fu = state.funders.find((f) => f.id === target.dataset.id);
    fu.status = fu.status === "活跃" ? "已停用" : "活跃";
    renderFunders();
    addActivity(`资金方 ${fu.name} 已${fu.status === "活跃" ? "启用" : "停用"}`);
    openFunderDetail(fu.id);
  } else if (target.id === "docRemind") {
    const list = target.dataset.scope === "fund" ? state.fundDocs : state.assetDocs;
    const doc = list[Number(target.dataset.index)];
    doc.reminded = new Date().toLocaleString("zh-CN", { hour12: false });
    renderDocs();
    addActivity(`已就「${doc.name}」向 ${docOwner(target.dataset.scope)} 发起催办`);
    document.getElementById("assetDialog").close();
  } else if (target.id === "fundRemind") {
    const fund = state.funds.find((f) => f.id === target.dataset.id);
    fund.reminded = new Date().toLocaleString("zh-CN", { hour12: false });
    addActivity(`已就资金流水 ${fund.id}（${fund.status}）向 资金运营 / 财务 发起催办`);
    document.getElementById("assetDialog").close();
  }
});

document.getElementById("todoSummary").addEventListener("click", (e) => {
  const btn = e.target.closest(".todo-filter");
  if (!btn) return;
  todoFilter = btn.dataset.filter;
  renderTodos();
});
document.getElementById("todoList").addEventListener("click", (e) => {
  const row = e.target.closest(".todo-row");
  if (!row) return;
  const it = lastTodos[Number(row.dataset.idx)];
  if (!it) return;
  setView(it.view);
  if (it.tab) { const btn = document.querySelector(`.tab-btn[data-tab="${it.tab}"]`); if (btn) btn.click(); }
  if (it.assetId) openAssetDetail(it.assetId);
});
document.querySelectorAll(".metric.clickable").forEach((card) => {
  card.addEventListener("click", () => {
    const jump = card.dataset.jump === "funds" ? "funding" : card.dataset.jump;
    setView(jump);
  });
});
document.querySelectorAll(".nav-item").forEach((item) => item.addEventListener("click", () => setView(item.dataset.view)));
// Tab switching inside 资金管理
document.querySelectorAll(".tab-btn").forEach((btn) => btn.addEventListener("click", () => {
  const tab = btn.dataset.tab;
  document.querySelectorAll(".tab-btn").forEach((b) => b.classList.toggle("active", b.dataset.tab === tab));
  document.querySelectorAll(".tab-pane").forEach((p) => p.classList.toggle("active", p.id === `tab-${tab}`));
}));

// Compliance buttons
document.getElementById("exportCompliance").addEventListener("click", () => {
  const allDocs = [...state.fundDocs, ...state.assetDocs];
  const gaps = allDocs.filter((d) => docIncomplete(d.status)).map((d) => d.name).join("、");
  addActivity(`合规摘要已提取：${allDocs.length} 份文件，缺口 ${gaps || "无"}`);
});
document.getElementById("jumpToContracts").addEventListener("click", () => {
  addActivity("已跳转至合同管理系统（Demo 模拟，实际系统对接中）");
});

document.getElementById("funderGrid").addEventListener("click", (e) => {
  const card = e.target.closest(".funder-card");
  if (card) openFunderDetail(card.dataset.id);
});
document.getElementById("materialContextBanner").addEventListener("click", (e) => {
  if (e.target.closest("#materialContextClear")) renderMaterialContext(null);
});
document.getElementById("flowFilter").addEventListener("click", (e) => {
  const chip = e.target.closest(".flow-chip");
  if (!chip) return;
  fundFilter = chip.dataset.status;
  renderFunds();
});
document.getElementById("addFunder").addEventListener("click", () => openDialog("funder"));
document.getElementById("globalAdd").addEventListener("click", () => openDialog(state.currentView === "assets" ? "asset" : state.currentView === "matching" ? "match" : "fund"));
document.getElementById("addAsset").addEventListener("click", () => openDialog("asset"));
document.getElementById("addFund").addEventListener("click", () => openDialog("fund"));
document.getElementById("addMatch").addEventListener("click", () => openDialog("match"));
document.querySelectorAll("[data-doc]").forEach((button) => button.addEventListener("click", () => openDialog("doc")));
document.querySelectorAll("#calcCurrency, #calcAmount, #calcFee, #calcRate").forEach((node) => node.addEventListener("input", calculateCost));
document.getElementById("saveCost").addEventListener("click", () => {
  const result = calculateCost();
  state.costs.unshift({ type: "平台换汇手续费", original: coin(result.platformFee, result.currency), reporting: money(result.platformFee), source: "计算器" });
  state.costs.unshift({ type: "汇率磨损", original: `少形成 ${money(result.rateLoss)}`, reporting: money(result.rateLoss), source: "计算器" });
  renderCosts();
  addActivity(`保存 ${result.currency} 兑换磨损成本记录`);
});

document.getElementById("recordForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = Object.fromEntries(new FormData(form).entries());
  if (form.dataset.type === "funder") {
    const fd = new FormData(form);
    const eligible = fd.getAll("eligible");
    const tenure = fd.getAll("tenure");
    const fields = {
      name: data.name, type: data.type, contact: data.contact,
      eligible: eligible.length ? eligible : ["LOC"],
      minYield: Number(data.minYield) || 0,
      minTicket: Number(data.minTicket) || 0,
      maxTicket: Number(data.maxTicket) || 0,
      tenure: tenure.length ? tenure : ["6个月"],
      committed: Number(data.committed) || 0,
      startDate: data.startDate || "",
      dueDate: data.dueDate || "",
    };
    const editId = form.dataset.editId;
    if (editId) {
      const fu = state.funders.find((x) => x.id === editId);
      Object.assign(fu, fields);
      renderFunders();
      addActivity(`编辑资金方 ${fu.name}（规则已更新）`);
    } else {
      const id = `FU-${String(++state.funderSeq).padStart(3, "0")}`;
      state.funders.push({ id, ...fields, status: "活跃", reminded: "", note: "" });
      renderFunders();
      addActivity(`新增资金方 ${data.name}（可配 ${fields.eligible.join("、")}）`);
    }
    form.dataset.editId = "";
  } else if (form.dataset.type === "asset") {
    const id = `AS-${String(++state.assetSeq).padStart(3, "0")}`;
    const dl = new Date(Date.now() + 21 * 86400000).toISOString().slice(0, 10);
    state.assets.unshift({
      id, name: data.name, category: data.category, amount: Number(data.amount), yield: data.yield, deadline: dl, status: "待匹配", docs: "待上传", applicant: "待指派", reminded: "",
      qualification: {
        controller: { status: "待补", nationality: "待核", identity: "待核", credit: "待核" },
        company: { status: "待补", age: "待核", type: "待核", ltmGmv: "待核", entity: "待核" },
        shop: { status: "待补", returnRate: "待核", repayRate: "待核", closeRate: "待核", platform: "待核" },
      },
    });
    renderAssets();
    renderMatching();
    addActivity(`新增资产 ${data.name}`);
  } else if (form.dataset.type === "match") {
    const asset = state.assets.find((a) => a.id === data.assetId);
    const fund = state.funds.find((f) => f.id === data.fundId);
    const amount = Math.min(Number(data.amount || 0), asset ? assetRemaining(asset) : 0, fund ? fundAvailable(fund) : 0);
    if (asset && fund && amount > 0) {
      const id = `MT-${String(++state.matchSeq).padStart(3, "0")}`;
      state.matches.unshift({ id, assetId: asset.id, assetName: asset.name, fundId: fund.id, funderId: fund.funderId || "", amount, time: new Date().toLocaleString("zh-CN", { hour12: false }) });
      syncAssetStatus(asset);
      renderAssets();
      renderFunders();
      renderMatching();
      addActivity(`撮合 ${fund.id} → ${asset.name} ${money(amount)}`);
    }
  } else if (form.dataset.type === "doc") {
    const target = data.scope === "fund" ? state.fundDocs : state.assetDocs;
    target.unshift({ name: data.name, status: "已上传", reminded: "" });
    renderDocs();
    addActivity(`上传资料 ${data.name}`);
  } else {
    state.funds.unshift({ id: data.id, funderId: data.funderId || "", coin: data.coin, amount: Number(data.amount), network: data.network, status: data.status, fiat: data.status === "法币已到账" ? Number(data.amount) * 0.998 : 0 });
    renderFunds();
    renderFunders();
    renderMatching();
    addActivity(`新增资金流转 ${data.id}`);
  }
  document.getElementById("recordDialog").close();
  renderDashboard();
});

document.getElementById("fundTable").addEventListener("click", (event) => {
  const button = event.target.closest(".advance-fund");
  if (!button) {
    const row = event.target.closest("tr.clickable");
    if (row) openFundDetail(row.dataset.id);
    return;
  }
  const item = state.funds.find((fund) => fund.id === button.dataset.id);
  const flow = ["稳定币待打款", "稳定币已到账", "稳定币换汇中", "法币已形成", "法币待提现", "法币已到账"];
  const next = flow[Math.min(flow.indexOf(item.status) + 1, flow.length - 1)];
  item.status = next;
  if (next === "法币已到账" && !item.fiat) item.fiat = item.amount * 0.9978;
  renderFunds();
  renderDashboard();
  renderMatching();
  renderFunders();
  addActivity(`${item.id} 状态推进为 ${next}`);
  // 到账自动提示：列出该资金方现在可撮合的（已过审且其准入通过的）资产
  if (next === "法币已到账") {
    const fu = state.funders.find((f) => f.id === item.funderId);
    if (fu && fu.status === "活跃") {
      const matchable = state.assets.filter((a) => assetRemaining(a) > 0 && eligibleForMatch(a) && isEligible(fu, a, Math.min(assetRemaining(a), fu.maxTicket, funderAvailable(fu))));
      if (matchable.length) addActivity(`💡 ${item.id} 已到账，${fu.name} 现可撮合：${matchable.map((a) => a.name).join("、")}`);
    }
  }
});

document.getElementById("matchTable").addEventListener("click", (event) => {
  const button = event.target.closest(".unmatch");
  if (!button) return;
  const index = state.matches.findIndex((match) => match.id === button.dataset.id);
  if (index === -1) return;
  const [removed] = state.matches.splice(index, 1);
  const asset = state.assets.find((item) => item.id === removed.assetId);
  if (asset) syncAssetStatus(asset);
  renderAssets();
  renderFunders();
  renderMatching();
  addActivity(`解除撮合 ${removed.id}（${removed.assetName} ${money(removed.amount)}）`);
});

renderDashboard();
renderAssets();
renderFunders();
renderFunds();
renderMatching();
renderCosts();
renderDocs();
calculateCost();
