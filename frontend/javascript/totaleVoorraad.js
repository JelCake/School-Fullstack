function initSSE() {
  const eventSource = new EventSource("/totale-voorraad");

  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (!data.success) return; // ← fixed logic
    renderTable(data.items); // ← pass the array, not the whole object
  };

  //   eventSource.onerror = (err) => {
  //     console.error("SSE connection error:", err);
  //     eventSource.close();
  //     setTimeout(initSSE, 3000); // ← auto-reconnect
  //   };
}

function renderTable(items) {
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = "";

  if (!items || !items.length) {
    tbody.innerHTML = `<tr><td colspan="9" class="text-center text-muted">Geen items gevonden</td></tr>`;
    return;
  }

  items.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><strong>${item.itemName}</strong><br/><small class="text-muted">${item.description ?? ""}</small></td>
      <td>${item.categoryName}</td>
      <td>${renderBadge(item.remainingAmount)}</td>
      <td>${item.remainingAmount} stuks</td>
      <td>-</td>
      <td>-</td>
      <td>-</td>
      <td>-</td>
      <td>
        <button class="btn btn-sm btn-outline-primary">Details</button>
        <button class="btn btn-sm btn-outline-success">+ Voorraad</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function renderBadge(amount) {
  if (amount <= 0) return `<span class="badge badge-kritiek">Kritiek</span>`;
  if (amount <= 10) return `<span class="badge badge-laag">Laag</span>`;
  return `<span class="badge badge-goed">Goed</span>`;
}

document.addEventListener("DOMContentLoaded", () => {
  initSSE();
});
