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

figureThisOut(initialAudits[0].matchedAudits[0].details);

function figureThisOut(data) {
  console.log(data);

  let headerKeys = [];
  let tableHead = [];
  let subItemHeadings = [];
  let itemOrValueTypes = [];
  let subItemTypes = [];

  data.headings.forEach((head) => {
    const headKey = head.key || head.url;
    const tableHeadTitle = head.text || head.label || " ";

    headerKeys.push(headKey);
    tableHead.push(tableHeadTitle);
    subItemHeadings.push(head.subItemsHeading);

    if (
      head.hasOwnProperty("subItemsHeading") &&
      head.subItemsHeading.hasOwnProperty("itemType")
    ) {
      subItemTypes.push(head.subItemsHeading.itemType);
    }

    itemOrValueTypes.push(head.itemType || head.valueType);
  });

  function formatCellData(type, data) {
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
        formatted = `
        <div>
        ${data.text} — <a href="${data.url}">${data.url}</a>
        </div>`;
        break;
      case "url": // valueType
        formatted = `<a href="${data}">${data}</a>`;
        break;
      case "code": // valueType
        formatted = data;
        break;
      case "bytes": // valueType
        formatted = `${(data * 0.000001).toFixed(3)} MBs`;
        break;
      case "timespanMs": // valueType
        formatted = `${data} ms`;
        break;
      default:
        formatted = data;
    }

    return formatted;
  }

  let table = document.querySelector("table");
  let tableTitles = Object.values(tableHead);
  generateTable(
    table,
    data.items,
    itemOrValueTypes,
    subItemHeadings,
    subItemTypes
  ); // generate the table first
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

  function generateTable(table, data, types, subItemHeadings, subItemTypes) {
    data.forEach((rowData) => {
      let newRow = table.insertRow();

      headerKeys.forEach((key, index) => {
        createTableRow(newRow, rowData, key, index, types);
      });

      if (rowData.hasOwnProperty("subItems")) {
        rowData.subItems.items.forEach((subRowData) => {
          let newRow = table.insertRow();

          subItemHeadings.forEach((subHeading, index) => {
            createTableRow(
              newRow,
              subRowData,
              subHeading.key,
              index,
              subItemTypes
            );
          });
        });
      }
    });
  }

  function createTableRow(newRow, rowData, key, index, types) {
    let cellToInsert = newRow.insertCell();
    let cellInfo = formatCellData(types[index], rowData[key]);

    if (
      (types[index] === "node" ||
        types[index] === "url" ||
        types[index] === "link") &&
      cellInfo
    ) {
      cellToInsert.innerHTML = cellInfo;
    } else {
      let dataToInsert = document.createTextNode(cellInfo || " ");
      cellToInsert.appendChild(dataToInsert);
    }
  }
}

/************** TYPES *************/

/* 

itemType

// createTableHeader(initialAudits[0].matchedAudits[0].details);
// title
// description
// score
// details.headings - table headings
// details.items > subItems - table contents

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

ms
- group
- groupLabel
- duration

node
numeric
link

*/
