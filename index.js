import { result } from "/obj.js";

const {
  lighthouseResult: {
    audits,
    categories: { performance },
  },
} = result;

let auditRefsToCheck = [];
let finalAudits = [];
let highPriorityAudits = [];
let medPriorityAudits = [];
let lowPriorityAudits = [];

let initialAudits = [];
let accumulatedAudits = [];

performance.auditRefs.forEach((audit) => {
  if (audit.hasOwnProperty("relevantAudits")) {
    audit.matchedAudits = [];
    initialAudits.push(audit);
  }
});

initialAudits.forEach((topAudit) => {
  topAudit.relevantAudits.forEach((innerAudit) => {
    if (audits[innerAudit].score === null) return;
    topAudit.matchedAudits.push(audits[innerAudit]);
  });
});

// sort by heaviest areas
initialAudits.sort((a, z) => z.weight - a.weight);

// sort each relevant audit by score, lowest to highest
initialAudits.forEach((audit) => {
  audit.matchedAudits.sort((a, z) => a.score - z.score);
});

initialAudits.forEach((audit) => {
  audit.matchedAudits.forEach((innerAudit) => {
    if (accumulatedAudits.indexOf(innerAudit.id) === -1) {
      accumulatedAudits.push(innerAudit.id);
      // console.log(innerAudit);
    }
  });
});

/* const testData = initialAudits[0].matchedAudits[0].details;

function createCellKeys(data) {
  return data.headings.map((head) => head.key);
}

function createHeaderText(data) {
  return data.headings.map((head) => head.text);
}

function createCellData(data) {
  return data.headings.map((head) => head.text);
} */

figureThisOut(initialAudits[0].matchedAudits[0].details);

// console.log(initialAudits[0].matchedAudits[6]);

function figureThisOut(data) {
  /* console.table(data.headings);
  console.table(data.items); */

  console.log(data);

  let headerKeys = [];
  let tableHead = [];
  let subItemHeadings = [];
  let itemOrValueTypes = [];

  data.headings.forEach((head) => {
    const headKey = head.key || head.url;
    const tableHeadTitle = head.text || head.label || " ";

    headerKeys.push(headKey);
    tableHead.push(tableHeadTitle);
    subItemHeadings.push(head.subItemsHeading);
    itemOrValueTypes.push(head.itemType || head.valueType);
  });

  function formatCellData(type, data) {
    // console.table(data);
    let formatted = "";

    switch (type) {
      case "text":
        formatted = data;
        break;
      case "ms":
        formatted = `${(data * 0.001).toFixed(3)} Seconds`;
        break;
      case "node":
        if (!data) break;

        formatted = `
        <div>
          <span>
            ${data?.nodeLabel}
          </span>
        </div>`;
        break;
      case "numeric":
        formatted = data;
        break;
      case "link":
        formatted = data;
        break;
      case "url": // valueType
        formatted = data;
        break;
      case "code": // valueType
        formatted = data;
        break;
      case "bytes": // valueType
        formatted = `${(data * 0.000001).toFixed(3)} MBs`;
        break;
      case "timespanMs": // valueType
        formatted = data;
        break;
      default:
        formatted = data;
    }

    return formatted;
  }

  let table = document.querySelector("table");
  let tableTitles = Object.values(tableHead);
  generateTable(table, data.items, itemOrValueTypes, subItemHeadings); // generate the table first
  generateTableHead(table, tableTitles);

  function generateTableHead(table, data) {
    // console.log(data);
    let thead = table.createTHead();
    let row = thead.insertRow();

    for (let key of data) {
      let th = document.createElement("th");
      let text = document.createTextNode(key);
      th.appendChild(text);
      row.appendChild(th);
    }
  }

  function generateTable(table, data, types, subItemHeadings) {
    data.forEach((rowData) => {
      let newRow = table.insertRow();

      headerKeys.forEach((key, index) => {
        createTableRow(newRow, rowData, key, index, types);
      });

      if (rowData.hasOwnProperty("subItems")) {
        rowData.subItems.items.forEach((subRowData) => {
          let newRow = table.insertRow();

          subItemHeadings.forEach((subHeading, index) => {
            createTableRow(newRow, subRowData, subHeading.key, index, types);
          });
        });
      }
    });
  }

  function createTableRow(newRow, rowData, key, index, types) {
    let cellToInsert = newRow.insertCell();
    let cellInfo = formatCellData(types[index], rowData[key]);

    if (types[index] === "node" && cellInfo) {
      cellToInsert.innerHTML = cellInfo;
    } else {
      let dataToInsert = document.createTextNode(cellInfo || " ");
      cellToInsert.appendChild(dataToInsert);
    }
  }
}

/* if (rowData.hasOwnProperty("subItems")) {
        rowData.subItems.items.forEach((rowData) => {
          subItemHeadings.forEach((subItem, subIndex) => {
            // console.log(subItem[innerItem.key]);
            // console.log(rowData[subItem.key]);
            let innerNewRow = table.insertRow();
            createTableRow(innerNewRow, rowData, subItem.key, subIndex, types);
            // generateTable();
          });
        });
      } */

/* // console.log(types[index]);
        let cell = row.insertCell();
        let cellData = formatCellData(types[index], item[key]);
        // console.log(cellData);

        if (types[index] === "node" && cellData) {
          // console.log(cellData);
          cell.innerHTML = cellData;
        } else {
          let dataToInsert = document.createTextNode(cellData || " ");
          cell.appendChild(dataToInsert);
        } */

/* data.items.forEach((item) => {
    headerKeys.forEach((key) => {
      // console.log(item[key]);
    });
  }); */

/*
let mountains = [
  { name: "Monte Falco", height: 1658, place: "Parco Foreste Casentinesi" },
  { name: "Monte Falterona", height: 1654, place: "Parco Foreste Casentinesi" },
  { name: "Poggio Scali", height: 1520, place: "Parco Foreste Casentinesi" },
  { name: "Pratomagno", height: 1592, place: "Parco Foreste Casentinesi" },
  { name: "Monte Amiata", height: 1738, place: "Siena" },
];

let table = document.querySelector("table");
let tableTitles = Object.keys(mountains[0]);
generateTable(table, mountains); // generate the table first
generateTableHead(table, tableTitles);

function generateTableHead(table, data) {
  console.log(data);
  let thead = table.createTHead();
  let row = thead.insertRow();

  for (let key of data) {
    let th = document.createElement("th");
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
}

function generateTable(table, data) {
  for (let element of data) {
    let row = table.insertRow();
    for (let key in element) {
      let cell = row.insertCell();
      let text = document.createTextNode(element[key]);
      cell.appendChild(text);
    }
  }
} */

/* EXAMPLE CODE */

// createTableHeader(initialAudits[0].matchedAudits[0].details);
// title
// description
// score
// details.headings - table headings
// details.items > subItems - table contents

function createTableHeaderRow(data) {
  let headerRow = ``;

  data.details.headings.forEach((heading) => {
    headerRow += `<th>${heading.text}</th>`;
  });

  return headerRow;
}

// console.log(JSON.stringify(initialAudits[0].matchedAudits[0], null, 4));

// const tableHeaderRows = createTableHeaderRow(initialAudits[0].matchedAudits[0]);
// const tableRows = createTableCells(initialAudits[0].matchedAudits[0]);

/* function makeTable(data) {
  // console.log(data);

  const tHeadRow = makeTableHead(data.details.headings);
  const tableRow = makeTableRow(data.details);

  const table = `
    <table>
        <thead>
            ${tHeadRow}
        </thead>
        <tbody>
            ${tableRow}
        </tbody>
    </table>
    `;

  return table;
} 

function makeTableHead(data) {
  let html = ``;

  data.forEach((heading) => {
    html += `<th>${heading.text}</th>`;
  });

  return `<tr>${html}</tr>`;
}
*/

/* MAKE TABLE FUNCTION */

// const createTable = makeTable(initialAudits[0].matchedAudits[0]);

function makeTableRow(data) {
  console.log(data);

  // const headings = Object.values(data.headings[0]);

  // EXTRACT VALUE FOR HTML HEADER
  const headings = Object.values(data.items[0]);
  console.log(headings);

  // CREATE DYNAMIC TABLE.
  const table = document.createElement("table");

  // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.
  let tr = table.insertRow(-1); // TABLE ROW.
  /* for (let i = 0; i < header.length; i++) {
    const th = document.createElement("th"); // TABLE HEADER.
    th.innerHTML = header[i];
    tr.appendChild(th);
  } */

  // ADD JSON DATA TO THE TABLE AS ROWS.
  for (let i = 0; i < data.items.length; i++) {
    // tr = table.insertRow(-1);

    for (let j = 0; j < headings.length; j++) {
      // let tabCell = tr.insertCell(-1);
      const key = headings[j];
      // console.log(headings[j]);
      // console.log(data.items[i][headings[j]]);
    }
  }

  // console.log(headings);

  /* for (let j = 0; j < data.items.length; j++) {
    // console.log(data.headings[0].key);

    for (let key of headings) {
      // console.log(key);
      // console.log(data.items[j][`${key}`]);
    }
    // console.log();

     for (let key in data.items[j]) {
      // console.log(data.items[j]);
      // console.log(data.items[j][key]);

      if (typeof data.items[j][key] === "object") {
        // console.log(data.items[j][key]);
      }
    } 
  } */

  /* for (let i = 0; i < data.headings.length; i++) {
    // console.log(data.headings[i].text);
    // console.log(data.headings[i].subItemsHeading.key);
    for (let j = 0; j < data.items.length; j++) {
      const element = data.items[j][data.headings[i].key];
      const subItems = data.items[j].hasOwnProperty("subItems");

      if (subItems) {
        for (let k = 0; k < data.items[j].subItems.items.length; k++) {
          // console.log(data.items[j].subItems.items[k]);
        }
      }
    }
  } */

  /* for (let i = 0; i < data.headings.length; i++) {
    const element = data.headings[i];
    console.log(element.text);

    console.log(i + data.items.length);
  } */
}

/* function makeTableRow(data) {
  let allRows = ``;
  let html = ``;

  data.headings.forEach((heading) => {
    console.log(heading);
    data.items.forEach((item) => {
      // html += `<td>${item[heading.key]}</td>`;
      html += `<td>${item[heading.key]}</td>`;

      if (item.hasOwnProperty("subItems")) {
        item.subItems.items.forEach((innerItem, idx) => {
          console.log(innerItem);
          // console.log(heading.subItemsHeading.key);
          // console.log(innerItem[heading.subItemsHeading.key]);
          html += `<td>${innerItem[heading.subItemsHeading.key]}</td>`;
        });
      }
    });

    allRows = `<tr>${html}</tr>`;
    // html = `<tr>${html}</tr>`;
  });

  // return `<tr>${html}</tr>`;
  return allRows;
} */

function createTableCells(data) {}

function checkType(item, heading) {
  let html = ``;

  switch (heading.itemType) {
    case "text":
      html = `${item[heading.key]}  ${item.value}`;
      break;
    case "node":
      html = `${item[heading.key]}`;
      break;
    case "numeric":
      html = `${item[heading.key]}`;
      break;
    default:
      `DEFAULT`;
  }

  return `<td>${html}</td>`;
}

// document.getElementById("inside").innerHTML = createTable;

/* document.getElementById("inside").innerHTML = `
<table>
    <thead>
    <tr>
    ${tableHeaderRows}
    </tr>
    </thead>
    <tbody>
    ${tableRows}
    </tbody>
</table>`; */

/* 
<tr>
        <td>Monte Falco</td>
        <td>1658</td>
        <td>Parco Foreste Casentinesi</td>
    </tr>
    <tr>
        <td>Monte Falterona</td>
        <td>1654</td>
        <td>Parco Foreste Casentinesi</td>
    </tr>
*/

function createTableHeader(details) {
  // look through heading
  details.headings.forEach((heading) => {
    // look through items
    details.items.forEach((item) => {
      if (item.hasOwnProperty("subItems")) {
        item.subItems.items.forEach((item) => {});
      }
    });
  });
}

initialAudits[0].matchedAudits[0].details.items.forEach((item) => {
  item.hasOwnProperty("subItems");
});

/************** OLD CODE *************/

/* if (audit.weight > 0) {
    audit.relevantAudits.forEach((audit) => auditRefsToCheck.push(audit));
  } */

/* const uniqueAuditRefs = [...new Set(auditRefsToCheck)];

uniqueAuditRefs.forEach((audit) => {
  if (audits[audit].score !== null) {
    finalAudits.push(audits[audit]);
  }
});

finalAudits.sort((a, z) => a.score - z.score);

finalAudits.forEach((audit) => {
  let score = audit.score;

  if (score >= 0 && score <= 0.49) {
    highPriorityAudits.push(audit);
  } else if (score >= 0.5 && score <= 0.89) {
    medPriorityAudits.push(audit);
  } else if (score >= 90 && score <= 1) {
    lowPriorityAudits.push(audit);
  }
}); */

/* 

itemType

url
- totalBytes: 565117,
- url
- wastedMs
- scripting: 39.90800000000001,
- scriptParseCompile: 13.75,
- total: 54.46800000000001

text
- 

bytes "subItemsHeading": {"key": "transferSize"}
- mainThreadTime
- transferSize
- url
- blockingTime

-

ms
- group
- groupLabel
- duration

node
numeric
link

*/

/* const table = document.createElement("table");
const tbody = document.createElement("tbody");
const th = document.createElement("th");
const tr = document.createElement("tr");
const td = document.createElement("td"); */
