import $ from "jquery";

function cellAt(row: number, col: number) {
  return $(`tr:nth-child(${row + 1}) td:nth-child(${col + 1})`);
}

function toggleCell(row: number, col: number) {
  const td = cellAt(row, col);
  td.toggleClass("on");
}

function toggleCells(row: number, col: number) {
  toggleCell(row, col);
  toggleCell(row - 1, col);
  toggleCell(row + 1, col);
  toggleCell(row, col - 1);
  toggleCell(row, col + 1);
}

function areAllCellsOff() {
  const cells = $("#table td").filter(".on");
  return cells.length === 0;
}

$("#dimform").on("submit", (e) => {
  e.preventDefault();
  const rows = new Number($("#rownum").val() ?? "").valueOf();
  const cols = new Number($("#colnum").val() ?? "").valueOf();
  const formdata = {
    rows,
    cols,
  };
  $.ajax({
    url: "/xrk4np/hw7/setup.php",
    data: formdata,
    success: (data) => {
      console.log(JSON.stringify(data));
      const table = $("#table");
      table.css("pointer-events", "auto");
      table.empty();
      $("#wonmsg").remove();
      for (let row = 0; row < rows; row++) {
        const tr = $(`<tr>`);
        for (let col = 0; col < cols; col++) {
          const td = $(`<td>`);
          td.on("click", (e) => {
            e.preventDefault();
            toggleCells(row, col);
            if (areAllCellsOff()) {
              $("#game").append(`
                <div id="wonmsg">
                  <p>You won!</p>
                  <p>Click the Start button to play again.</p>
                </div>
              `);
              $("#table").css("pointer-events", "none");
            }
          });
          tr.append(td);
        }
        table.append(tr);
      }
      for (const cell of data) {
        const td = cellAt(cell.row, cell.col);
        td.addClass("on");
      }
    },
    error: (err) => {
      console.log(err);
    },
  });
});
