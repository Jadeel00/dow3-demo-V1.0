const state = {
  currentView: "dashboard",
  assets: [
    { id: "AS-001", name: "LOC-Alpha-001", category: "LOC", amount: 620000, yield: "13.2%", status: "待匹配", docs: "完整", applicant: "张维（Alpha 资产方）", reminded: "" },
    { id: "AS-002", name: "DPL-Orbit-018", category: "DPL", amount: 410000, yield: "14.8%", status: "资料缺失", docs: "缺商业登记证、物流账单", applicant: "王琳（Orbit 资产方）", reminded: "" },
    { id: "AS-003", name: "FP-Mercury-009", category: "Fast Pay", amount: 180000, yield: "10.6%", status: "待复核", docs: "待运营复核", applicant: "陈默（Mercury 资产方）", reminded: "" },
  ],
  funds: [
    { id: "FR-2026-0527-01", coin: "USDT", amount: 180000, network: "Tron", status: "稳定币已到账", fiat: 0 },
    { id: "FR-2026-0527-02", coin: "USDC", amount: 420000, network: "Ethereum", status: "稳定币换汇中", fiat: 0 },
    { id: "FR-2026-0526-07", coin: "USDT", amount: 760000, network: "Tron", status: "法币已到账", fiat: 757820 },
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
  document.getElementById("pageTitle").textContent = { dashboard: "工作台", assets: "资产管理", funds: "资金流转", matching: "资金撮合", finance: "财务与磨损", disclosure: "合规与披露" }[view];
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
  document.getElementById("activityList").replaceChildren(
    ...state.activities.slice(0, 6).map((item) => {
      const row = document.createElement("div");
      row.className = "activity-item";
      row.innerHTML = `<strong>${item.split(" · ")[0]}</strong><p>${item.split(" · ").slice(1).join(" · ")}</p>`;
      return row;
    }),
  );
}

function renderAssets() {
  document.getElementById("assetGrid").replaceChildren(
    ...state.assets.map((item) => {
      const card = document.createElement("article");
      const pillClass = item.category === "LOC" ? "loc" : item.category === "DPL" ? "dpl" : "fast";
      card.className = "asset-card clickable";
      card.dataset.id = item.id;
      card.innerHTML = `
        <header><span class="pill ${pillClass}">${item.category}</span><span>${item.status}</span></header>
        <h3>${item.name}</h3>
        <p>${item.category} 资产，已进入第一版资产台账。</p>
        <dl>
          <div><dt>本金</dt><dd>${money(item.amount)}</dd></div>
          <div><dt>收益率</dt><dd>${item.yield}</dd></div>
          <div><dt>已配资</dt><dd>${money(assetMatched(item.id))}</dd></div>
          <div><dt>缺口</dt><dd>${assetRemaining(item) ? money(assetRemaining(item)) : "已配齐"}</dd></div>
          <div><dt>资料</dt><dd>${item.docs}</dd></div>
        </dl>`;
      return card;
    }),
  );
}

function renderFunds() {
  document.getElementById("fundTable").replaceChildren(
    ...state.funds.map((item) => {
      const row = document.createElement("tr");
      row.className = "clickable";
      row.dataset.id = item.id;
      const statusClass = item.status === "法币已到账" ? "received" : item.status === "稳定币换汇中" ? "convert" : "pending";
      row.innerHTML = `
        <td>${item.id}</td>
        <td>${coin(item.amount, item.coin)}</td>
        <td>${item.network}</td>
        <td><span class="status ${statusClass}">${item.status}</span></td>
        <td>${item.fiat ? money(item.fiat) : "-"}</td>
        <td><button class="secondary advance-fund" data-id="${item.id}">推进状态</button></td>`;
      return row;
    }),
  );
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
      row.innerHTML = `
        <td>${item.id}</td>
        <td>${item.assetName}</td>
        <td>${item.fundId}</td>
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

function openDialog(type) {
  const dialog = document.getElementById("recordDialog");
  const fields = document.getElementById("dialogFields");
  document.getElementById("recordForm").dataset.type = type;
  document.getElementById("dialogTitle").textContent = type === "asset" ? "新增资产" : type === "doc" ? "上传资料" : type === "match" ? "新建撮合" : "新增资金流转";
  if (type === "match") {
    const openAssets = state.assets.filter((asset) => assetRemaining(asset) > 0);
    const openFunds = state.funds.filter((fund) => fundAvailable(fund) > 0);
    if (!openAssets.length || !openFunds.length) {
      fields.innerHTML = `<p style="color:var(--muted)">${!openFunds.length ? "暂无可用法币：请先在「资金流转」把流水推进到「法币已到账」。" : "所有资产都已配齐，暂无可撮合的缺口。"}</p>`;
      document.getElementById("submitRecord").disabled = true;
      dialog.showModal();
      return;
    }
    document.getElementById("submitRecord").disabled = false;
    fields.innerHTML = `
      <label>待配资产<select name="assetId">${openAssets.map((a) => `<option value="${a.id}">${a.name} · 缺口 ${money(assetRemaining(a))}</option>`).join("")}</select></label>
      <label>资金流水<select name="fundId">${openFunds.map((f) => `<option value="${f.id}">${f.id} · 可用 ${money(fundAvailable(f))}</option>`).join("")}</select></label>
      <label>配资金额<input name="amount" type="number" min="0" /></label>`;
    const assetSelect = fields.querySelector("[name=assetId]");
    const fundSelect = fields.querySelector("[name=fundId]");
    const amountInput = fields.querySelector("[name=amount]");
    const suggest = () => {
      const asset = state.assets.find((a) => a.id === assetSelect.value);
      const fund = state.funds.find((f) => f.id === fundSelect.value);
      amountInput.value = Math.min(assetRemaining(asset), fundAvailable(fund));
      amountInput.max = Math.min(assetRemaining(asset), fundAvailable(fund));
    };
    assetSelect.addEventListener("change", suggest);
    fundSelect.addEventListener("change", suggest);
    suggest();
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

  const rows = [
    ["产品类别", asset.category],
    ["状态", asset.status],
    ["本金", money(asset.amount)],
    ["收益率", asset.yield],
    ["已配资", money(matched)],
    ["缺口", remaining ? money(remaining) : "已配齐"],
    ["申请人", asset.applicant || "待指派"],
    ["资料", asset.docs],
  ];
  let html = rows.map(([k, v]) => `<div><span>${k}</span><strong>${v}</strong></div>`).join("");
  if (lacking) {
    html += `<div class="detail-note">资料不完整，需申请人补齐后才能进入正式撮合。${asset.reminded ? `<br/><em>已于 ${asset.reminded} 发送提醒 / 任务</em>` : ""}</div>`;
  }
  document.getElementById("assetDialogBody").innerHTML = html;

  const buttons = [];
  if (lacking) {
    buttons.push(`<button class="primary" id="assetRemind" data-id="${asset.id}">${asset.reminded ? "再次提醒申请人" : "发送补件提醒 / 任务"}</button>`);
  } else if (remaining > 0) {
    buttons.push(`<button class="primary" id="assetToMatch" data-id="${asset.id}">去撮合配资</button>`);
  }
  buttons.push(`<button class="secondary" id="assetDetailDone">关闭</button>`);
  document.getElementById("assetDialogActions").innerHTML = buttons.join("");
  document.getElementById("assetDialog").showModal();
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
  document.getElementById("assetDialog").showModal();
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
  document.getElementById("assetDialog").showModal();
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
  if (target.id === "assetDetailDone") {
    document.getElementById("assetDialog").close();
  } else if (target.id === "assetRemind") {
    const asset = state.assets.find((a) => a.id === target.dataset.id);
    asset.reminded = new Date().toLocaleString("zh-CN", { hour12: false });
    addActivity(`已向 ${asset.applicant} 发送补件提醒 / 任务：${asset.name}（${asset.docs}）`);
    document.getElementById("assetDialog").close();
  } else if (target.id === "assetToMatch") {
    document.getElementById("assetDialog").close();
    setView("matching");
    openDialog("match");
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

document.querySelectorAll(".metric.clickable").forEach((card) => card.addEventListener("click", () => setView(card.dataset.jump)));
document.querySelectorAll(".nav-item").forEach((item) => item.addEventListener("click", () => setView(item.dataset.view)));
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
  if (form.dataset.type === "asset") {
    const id = `AS-${String(++state.assetSeq).padStart(3, "0")}`;
    state.assets.unshift({ id, name: data.name, category: data.category, amount: Number(data.amount), yield: data.yield, status: "待匹配", docs: "待上传", applicant: "待指派", reminded: "" });
    renderAssets();
    renderMatching();
    addActivity(`新增资产 ${data.name}`);
  } else if (form.dataset.type === "match") {
    const asset = state.assets.find((a) => a.id === data.assetId);
    const fund = state.funds.find((f) => f.id === data.fundId);
    const amount = Math.min(Number(data.amount || 0), asset ? assetRemaining(asset) : 0, fund ? fundAvailable(fund) : 0);
    if (asset && fund && amount > 0) {
      const id = `MT-${String(++state.matchSeq).padStart(3, "0")}`;
      state.matches.unshift({ id, assetId: asset.id, assetName: asset.name, fundId: fund.id, amount, time: new Date().toLocaleString("zh-CN", { hour12: false }) });
      syncAssetStatus(asset);
      renderAssets();
      renderMatching();
      addActivity(`撮合 ${fund.id} → ${asset.name} ${money(amount)}`);
    }
  } else if (form.dataset.type === "doc") {
    const target = data.scope === "fund" ? state.fundDocs : state.assetDocs;
    target.unshift({ name: data.name, status: "已上传", reminded: "" });
    renderDocs();
    addActivity(`上传资料 ${data.name}`);
  } else {
    state.funds.unshift({ id: data.id, coin: data.coin, amount: Number(data.amount), network: data.network, status: data.status, fiat: data.status === "法币已到账" ? Number(data.amount) * 0.998 : 0 });
    renderFunds();
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
  addActivity(`${item.id} 状态推进为 ${next}`);
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
  renderMatching();
  addActivity(`解除撮合 ${removed.id}（${removed.assetName} ${money(removed.amount)}）`);
});

renderDashboard();
renderAssets();
renderFunds();
renderMatching();
renderCosts();
renderDocs();
calculateCost();
