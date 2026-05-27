const state = {
  currentView: "dashboard",
  assets: [
    { name: "LOC-Alpha-001", category: "LOC", amount: 620000, yield: "13.2%", status: "待匹配", docs: "完整" },
    { name: "DPL-Orbit-018", category: "DPL", amount: 410000, yield: "14.8%", status: "资料缺失", docs: "缺商业登记证、物流账单" },
    { name: "FP-Mercury-009", category: "Fast Pay", amount: 180000, yield: "10.6%", status: "待复核", docs: "待运营复核" },
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
  fundDocs: ["NDA · 已归档", "借贷协议 · 已归档", "债权转让协议 · 待签署", "技术服务协议 · 已归档"],
  assetDocs: ["支用协议 · 已上传", "借贷协议 · 已上传", "公司注册书 · 已上传", "商业登记证 · 缺失", "物流账单 · 缺失"],
  activities: ["系统已载入 Dow3 MVP 互动 Demo"],
};

const money = (value) => `USD ${Number(value).toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
const coin = (value, symbol) => `${Number(value).toLocaleString("en-US", { maximumFractionDigits: 4 })} ${symbol}`;

function addActivity(text) {
  state.activities.unshift(`${new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })} · ${text}`);
  renderDashboard();
}

function setView(view) {
  state.currentView = view;
  document.querySelectorAll(".nav-item").forEach((item) => item.classList.toggle("active", item.dataset.view === view));
  document.querySelectorAll(".view").forEach((node) => node.classList.toggle("active", node.id === view));
  document.getElementById("pageTitle").textContent = { dashboard: "工作台", assets: "资产管理", funds: "资金流转", finance: "财务与磨损", disclosure: "合规与披露" }[view];
}

function renderDashboard() {
  const fiatTotal = state.funds.reduce((sum, item) => sum + item.fiat, 0);
  const stableTotal = state.funds.filter((item) => item.status !== "法币已到账").reduce((sum, item) => sum + item.amount, 0);
  const assetTotal = state.assets.reduce((sum, item) => sum + item.amount, 0);
  document.getElementById("fiatTotal").textContent = money(fiatTotal);
  document.getElementById("stableTotal").textContent = `USDT ${stableTotal.toLocaleString("en-US")}`;
  document.getElementById("assetTotal").textContent = money(assetTotal);
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
      card.className = "asset-card";
      card.innerHTML = `
        <header><span class="pill ${pillClass}">${item.category}</span><span>${item.status}</span></header>
        <h3>${item.name}</h3>
        <p>${item.category} 资产，已进入第一版资产台账。</p>
        <dl>
          <div><dt>本金</dt><dd>${money(item.amount)}</dd></div>
          <div><dt>收益率</dt><dd>${item.yield}</dd></div>
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

function renderCosts() {
  document.getElementById("costTable").replaceChildren(
    ...state.costs.map((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${item.type}</td><td>${item.original}</td><td>${item.reporting}</td><td>${item.source}</td>`;
      return row;
    }),
  );
}

function renderDocs() {
  const render = (id, docs) => document.getElementById(id).replaceChildren(...docs.map((text) => {
    const item = document.createElement("li");
    const [name, status] = text.split(" · ");
    item.innerHTML = `<span>${name}</span><strong>${status}</strong>`;
    return item;
  }));
  render("fundDocs", state.fundDocs);
  render("assetDocs", state.assetDocs);
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
  document.getElementById("dialogTitle").textContent = type === "asset" ? "新增资产" : type === "doc" ? "上传资料" : "新增资金流转";
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

document.querySelectorAll(".nav-item").forEach((item) => item.addEventListener("click", () => setView(item.dataset.view)));
document.getElementById("globalAdd").addEventListener("click", () => openDialog(state.currentView === "assets" ? "asset" : "fund"));
document.getElementById("addAsset").addEventListener("click", () => openDialog("asset"));
document.getElementById("addFund").addEventListener("click", () => openDialog("fund"));
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
    state.assets.unshift({ name: data.name, category: data.category, amount: Number(data.amount), yield: data.yield, status: "待匹配", docs: "待上传" });
    renderAssets();
    addActivity(`新增资产 ${data.name}`);
  } else if (form.dataset.type === "doc") {
    const target = data.scope === "fund" ? state.fundDocs : state.assetDocs;
    target.unshift(`${data.name} · 已上传`);
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
  if (!button) return;
  const item = state.funds.find((fund) => fund.id === button.dataset.id);
  const flow = ["稳定币待打款", "稳定币已到账", "稳定币换汇中", "法币已形成", "法币待提现", "法币已到账"];
  const next = flow[Math.min(flow.indexOf(item.status) + 1, flow.length - 1)];
  item.status = next;
  if (next === "法币已到账" && !item.fiat) item.fiat = item.amount * 0.9978;
  renderFunds();
  renderDashboard();
  addActivity(`${item.id} 状态推进为 ${next}`);
});

renderDashboard();
renderAssets();
renderFunds();
renderCosts();
renderDocs();
calculateCost();
