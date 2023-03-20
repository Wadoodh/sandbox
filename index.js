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
let container = document.querySelector(".container");

let initialAudits = [];
let accumulatedAudits = [];

performance.auditRefs.forEach((audit) => {
  if (audit.hasOwnProperty("relevantAudits")) {
    // create new property to store relevant audits
    audit.matchedAudits = [];
    initialAudits.push(audit);
  }
});

initialAudits.forEach((auditCategory) => {
  auditCategory.relevantAudits.forEach((audit) => {
    if (audits[audit].score === null) return;

    audits[audit].belongsToAuditCategory = {
      acronym: auditCategory.acronym,
      id: auditCategory.id,
      weight: auditCategory.weight,
    };

    auditCategory.matchedAudits.push(audits[audit]);
  });
});

// sort by heaviest areas
initialAudits.sort((a, z) => z.weight - a.weight);

// sort each relevant audit by score, lowest to highest
initialAudits.forEach((audit) => {
  audit.matchedAudits.sort((a, z) => a.score - z.score);
});

// console.log(initialAudits);

initialAudits.forEach((auditCategory) => {
  auditCategory.matchedAudits.forEach((audit) => {
    if (accumulatedAudits.indexOf(audit.id) === -1) {
      accumulatedAudits.push(audit.id);

      if (audit.score >= 0 && audit.score <= 0.49) {
        // highPriorityAudits.push(audit);
        createAudit(audit, audit.details);
      } else if (audit.score >= 0.5 && audit.score <= 0.89) {
        // medPriorityAudits.push(audit);
        createAudit(audit, audit.details);
      } else if (audit.score >= 0.9 && audit.score <= 1) {
        // lowPriorityAudits.push(audit);
        // createAudit(audit, audit.details);
      }

      // createAudit(audit, audit.details);
    }
  });
});

// console.log(highPriorityAudits);

/* createAudit(
  initialAudits[0].matchedAudits[1],
  initialAudits[0].matchedAudits[1].details
); */

function createTitle(text) {
  const title = document.createElement("h2");
  const titleText = document.createTextNode(text);
  title.appendChild(titleText);
  return title;
}

function createDescription(text) {
  const description = document.createElement("p");
  const descriptionText = document.createTextNode(text);
  description.appendChild(descriptionText);
  return description;
}

function createAudit(main, data) {
  if (!data) return;

  // console.log(data);

  const title = createTitle(main.title);
  const description = createDescription(main.description);

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
      /* case "text":
        formatted = data;
        break; */
      case "ms":
        // formatted = `${(data * 0.001).toFixed(3)} seconds`;
        formatted = `${data.toFixed(0)} ms`;
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
      /* case "numeric":
        formatted = data;
        break; */
      case "link":
        formatted = `
        <div>
        ${data.text} — <a href="${data.url}">${data.url}</a>
        </div>`;
        break;
      case "url": // valueType
        if (!data) break;
        if (typeof data === "object") {
          formatted = `<a href="${data.url}">${data.url}</a>`;
        } else if (data.includes("https")) {
          formatted = `<a href="${data}">${data}</a>`;
        } else {
          formatted = data;
        }
        break;
      case "source-location": // valueType source-location
        formatted = `<a href="${data.location.url}">${data.location.url}</a>`;
        break;
      case "code": // valueType
        if (!data) break;
        if (data && data.includes("https")) {
          formatted = `<a href="${data}">${data}</a>`;
        } else {
          formatted = data;
        }
        break;
      case "bytes": // valueType
        if (!data) return "";
        formatted = `${(data * 0.000976562).toFixed(2)} KiB`;
        break;
      case "timespanMs": // valueType
        formatted = `${data} ms`;
        break;
      default:
        formatted = data;
    }

    return formatted;
  }

  let table = document.createElement("table");
  let tableTitles = Object.values(tableHead);

  generateTable(
    table,
    data.items,
    itemOrValueTypes,
    subItemHeadings,
    subItemTypes
  );

  // generate the table first
  generateTableHead(table, tableTitles);

  function generateTableHead(table, data) {
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
              subHeading?.key || "none",
              index,
              subItemTypes,
              true
            );
          });
        });
      }
    });
  }

  function createTableRow(
    newRow,
    rowData,
    key,
    index,
    types,
    isSubItem = false
  ) {
    let cellToInsert = newRow.insertCell();
    if (isSubItem) cellToInsert.classList.add("sub-item");
    let cellInfo = formatCellData(
      types[index] || itemOrValueTypes[index],
      rowData[key]
    );

    if (
      (types[index] === "node" ||
        types[index] === "url" ||
        types[index] === "link" ||
        types[index] === "code" ||
        rowData.hasOwnProperty("location") ||
        rowData.hasOwnProperty("url")) &&
      cellInfo
    ) {
      cellToInsert.innerHTML = cellInfo;
    } else {
      let dataToInsert = document.createTextNode(cellInfo || " ");
      cellToInsert.appendChild(dataToInsert);
    }
  }

  // document.body.append(table);
  container.append(title);
  container.append(description);
  container.append(table);
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
