google.charts.load("current", { packages: ["gantt"] });
        
        function drawChart() {
            var data = new google.visualization.DataTable();
            data.addColumn("string", "Task ID");
            data.addColumn("string", "Task Name");
            data.addColumn("string", "Resource");
            data.addColumn("date", "Start Date");
            data.addColumn("date", "End Date");
            data.addColumn("number", "Duration");
            data.addColumn("number", "Percent Complete");
            data.addColumn("string", "Dependencies");

            var tableBody = document.getElementById("previewTableBody");
            var rows = tableBody.getElementsByTagName("tr");
            var chartData = [];
            
            for (var i = 0; i < rows.length; i++) {
                var cols = rows[i].getElementsByTagName("td");
                if (cols.length < 5) continue;
                
                var taskId = "Task" + (i + 1);
                var taskName = cols[1].textContent;
                var subDescription = cols[2].textContent;
                var startDate = new Date(cols[3].textContent);
                var endDate = new Date(cols[4].textContent);
                var duration = null;
                var percentComplete = 0;
                var dependencies = null;
                
                chartData.push([taskId, taskName, subDescription, startDate, endDate, duration, percentComplete, dependencies]);
            }

            data.addRows(chartData);

            var options = {
                height: 400,
                gantt: {
                    trackHeight: 30,
                    criticalPathEnabled: false,
                    arrow: {
                        angle: 100,
                        width: 2,
                        color: "black"
                    },
                    barLabelStyle: {
                        fontName: "Arial",
                        fontSize: 12
                    },
                    labelStyle: {
                        fontSize: 14
                    },
                    tooltip: {
                        isHtml: true,
                        textStyle: {
                            fontSize: 12
                        },
                        format: "DD/MM"
                    },
                    palette: [
                        { color: "#1E90FF", dark: "#1E90FF", light: "#1E90FF" } // Warna hanya biru
                    ]
                }
            };

            var chart = new google.visualization.Gantt(document.getElementById("gantt_chart"));
            chart.draw(data, options);
        }

    function updateProgress(section) {
        let checkboxes = document.querySelectorAll(`.${section} input[type='checkbox']`);
        let checked = document.querySelectorAll(`.${section} input[type='checkbox']:checked`).length;
        let progress = Math.round((checked / checkboxes.length) * 100);
        document.getElementById(`${section}-progress`).innerText = progress + "%";
        updateOverallProgress();
    }

    function updateOverallProgress() {
        let sections = document.querySelectorAll('.progress-section');
        let totalChecked = 0, totalCheckboxes = 0;
        
        sections.forEach(section => {
            let checkboxes = section.querySelectorAll("input[type='checkbox']");
            let checked = section.querySelectorAll("input[type='checkbox']:checked").length;
            totalChecked += checked;
            totalCheckboxes += checkboxes.length;
        });
        
        let overallProgress = totalCheckboxes ? Math.round((totalChecked / totalCheckboxes) * 100) : 0;
        document.getElementById("overall-progress").innerText = overallProgress + "%";
    }

    function addSection() {
        let sectionName = document.getElementById("new-section-name").value.trim();
        if (sectionName === "") return;
        
        let container = document.getElementById("sections-container");
        let sectionId = sectionName.toLowerCase().replace(/\s+/g, '-');
        
        let sectionHTML = `
        <details>
            <summary class="text-lg font-semibold">${sectionName} (<span id="${sectionId}-progress">0%</span>)</summary>
            <div class="progress-section ${sectionId}">
                <ul id="${sectionId}-list"></ul>
                <input type="text" id="${sectionId}-task" placeholder="Tambahkan tugas" />
                <button onclick="addTask('${sectionId}')">Tambah</button>
            </div>
        `;
        
        let sectionDiv = document.createElement("div");
        sectionDiv.innerHTML = sectionHTML;
        container.appendChild(sectionDiv);
        
        document.getElementById("new-section-name").value = "";
    }

    function addTask(sectionId) {
        let taskInput = document.getElementById(`${sectionId}-task`);
        let taskName = taskInput.value.trim();
        if (taskName === "") return;
        
        let list = document.getElementById(`${sectionId}-list`);
        let listItem = document.createElement("li");
        listItem.innerHTML = `<input type="checkbox" onclick="updateProgress('${sectionId}')"> ${taskName}`;
        list.appendChild(listItem);
        
        taskInput.value = "";
    }


        function savePage1() {
            const projectName = document.getElementById('projectName').value;
            const projectCustomer = document.getElementById('projectCustomer').value;
            const qty = document.getElementById('qty').value;
            const startDate = document.getElementById('startDate').value;
            const targetDate = document.getElementById('targetDate').value;

            if (projectName && projectCustomer && qty && startDate && targetDate) {
                window.location.href = "forms2.html";
            } else {
                alert('Please fill in all fields.');
            }
        }


function addToPreview(rowIndex) {
    const row = document.querySelector(`#progressTableBody tr:nth-child(${rowIndex})`);
    if (!row) return;

    const taskDescElement = row.children[1].querySelector('input') || row.children[1];
    const subDescElement = row.children[2].querySelector('input') || row.children[2].querySelector('select');
    const subDesc = subDescElement.value.trim();
    const taskDesc = taskDescElement.value || taskDescElement.innerText;
   const startDate = document.getElementById(`start${rowIndex}`).value;
    const finishDate = document.getElementById(`finish${rowIndex}`).value;
    const previewTableBody = document.getElementById('previewTableBody');

    // Cek apakah sub description sudah ada di tabel
    const existingRows = Array.from(previewTableBody.children);
    const subDescExists = existingRows.some(row => row.children[2].innerText === subDesc);

    if (subDescExists) {
        alert(`${subDesc} sudah ditambahkan.`);
        return;
    }

    const newRow = document.createElement('tr');
newRow.innerHTML = `
    <td class="border px-4 py-2 border-gray-700">${rowIndex}</td>
    <td class="border px-4 py-2 border-gray-700">${taskDesc}</td>
    <td class="border px-4 py-2 border-gray-700">${subDesc}</td>
    <td class="border px-4 py-2  border-gray-700 start-date">${startDate || "-"}</td>
    <td class="border px-4 py-2  border-gray-700 finish-date">${finishDate || "-"}</td>
    <td class="border px-4 py-2  border-gray-700">
        <button class="px-2 py-1 border-gray-700 border rounded" onclick="editPreviewRow(this)">Edit</button>
        <button class="px-2 py-1 border-gray-700 border rounded" onclick="removePreviewRow(this)">Remove</button>
    </td>
`;

    previewTableBody.appendChild(newRow);
}


function removePreviewRow(button) {
    button.closest('tr').remove();
}

function addNewDescription() {
            const tableBody = document.getElementById('progressTableBody');
            const newRow = document.createElement('tr');
            const rowIndex = tableBody.children.length + 1;

            newRow.innerHTML = `
                <td class="border px-4 py-2 border-gray-700">${rowIndex}</td>
                <td class="border px-4 py-2 border-gray-700"><input type="text" class="w-full px-3 py-2 border rounded b" placeholder="Description"></td>
                <td class="border px-4 py-2 border-gray-700"><input type="text" class="w-full px-3 py-2 border rounded" placeholder="Sub Description"></td>
                <td class="border px-4 py-2 border-gray-700" ><input type="date" class="w-full px-3 py-2 border rounded " id="start${rowIndex}"></td>
                <td class="border px-4 py-2 border-gray-700"><input type="date" class="w-full px-3 py-2 border rounded " id="finish${rowIndex}"></td>
                <td class="border px-4 py-2 border-gray-700">
                    <button class="px-2 py-1 font-bold border rounded border-gray-700" onclick="addToPreview(${rowIndex})">OK</button>
                    <button class="px-2 py-1 font-bold border rounded border-gray-700" onclick="removeRow(this)">Remove</button>
                </td> 
            `;
            tableBody.appendChild(newRow);
        }


        function editPreviewRow(button) {
    const row = button.parentElement.parentElement;
    const isEditing = button.innerText === 'OK';

    if (isEditing) {
        // Jika tombol OK ditekan, simpan nilai input ke dalam tabel sebagai teks biasa
        const startInput = row.querySelector('.start-date input');
        const finishInput = row.querySelector('.finish-date input');

        row.querySelector('.start-date').innerHTML = startInput.value || "-";
        row.querySelector('.finish-date').innerHTML = finishInput.value || "-";

        button.innerText = 'Edit';
    } else {
        // Jika tombol Edit ditekan, ubah teks menjadi input
        const startDate = row.querySelector('.start-date').innerText.trim();
        const finishDate = row.querySelector('.finish-date').innerText.trim();

        row.querySelector('.start-date').innerHTML = `<input type="date" class="w-full px-3 py-2 border rounded" value="${startDate !== '-' ? startDate : ''}">`;
        row.querySelector('.finish-date').innerHTML = `<input type="date" class="w-full px-3 py-2 border rounded" value="${finishDate !== '-' ? finishDate : ''}">`;

        button.innerText = 'OK';
    }
}

        function removePreviewRow(button) {
            const row = button.parentElement.parentElement;
            row.remove();
        }

        function removeRow(button) {
            const row = button.parentElement.parentElement;
            row.remove();
        }

        function saveProject() {
            alert('Project Successfully Added!');
        }

        function searchTable() {
            const input = document.getElementById('searchInput').value.toLowerCase();
            const table = document.getElementById('manPowerTable');
            const rows = table.getElementsByTagName('tr');

            for (let i = 1; i < rows.length; i++) {
                const cells = rows[i].getElementsByTagName('td');
                let match = false;
                for (let j = 0; j < cells.length; j++) {
                    if (cells[j].innerText.toLowerCase().includes(input)) {
                        match = true;
                        break;
                    }
                }
                rows[i].style.display = match ? '' : 'none';
            }
        }

        document.addEventListener('DOMContentLoaded', () => {
            updateProgressTable();
        });
