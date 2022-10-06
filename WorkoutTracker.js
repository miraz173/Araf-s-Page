class WorkoutTracker {
    static LOCAL_STORAGE_DATA_KEY = "workout-tracker-entries";

    constructor(root) {
        this.root = root;
        this.root.insertAdjacentHTML("afterbegin", WorkoutTracker.html());
        this.entries = [];

        this.loadEntries();
        this.updateView();

        this.root.querySelector(".tracker__add").addEventListener("click", () => {
            const date = new Date();
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, "0");
            const day = date.getDay().toString().padStart(2, "0");

            this.addEntry({
                date: `${ year }-${ month }-${ day }`,
                workout: "Offline",
                name: "",
                post: "Engineer",
            });
        });
    }

    static html() {
        return `
            <table class="tracker">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Company Name    </th>
                        
                        <th></th>
                    </tr>
                </thead>
                <tbody class="tracker__entries"></tbody>
                <tbody>
                    <tr class="tracker__row tracker__row--add">
                        <td colspan="4">
                            <button class="tracker__add">Add Entry &plus;</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        `;
    }

    static rowHtml() {
        return `
            <tr class="tracker__row">
                <td>
                    <input type="date" class="tracker__date">
                </td>
                <td>
                    <select class="tracker__workout">
                        <option value="Offline">Offline     </option>
                        <option value="Online">Online       </option>
                    </select>
                </td>
                <td>
                    <input type="text" class="tracker__name">
                </td>
         
                <td>
                    <button type="button" class="tracker__button tracker__delete">&times;</button>
                </td>
            </tr>
        `;
    }

    loadEntries() {
        this.entries = JSON.parse(localStorage.getItem(WorkoutTracker.LOCAL_STORAGE_DATA_KEY) || "[]");
    }

    saveEntries() {
        localStorage.setItem(WorkoutTracker.LOCAL_STORAGE_DATA_KEY, JSON.stringify(this.entries));
    }

    updateView() {
        const tableBody = this.root.querySelector(".tracker__entries");
        const addRow = data => {
            const template = document.createElement("template");
            let row = null;

            template.innerHTML = WorkoutTracker.rowHtml().trim();
            row = template.content.firstElementChild;

            row.querySelector(".tracker__date").value = data.date;
            row.querySelector(".tracker__workout").value = data.workout;
            row.querySelector(".tracker__name").value = data.name;
            //row.querySelector(".tracker__post").value = data.post;

            row.querySelector(".tracker__date").addEventListener("change", ({ target }) => {
                data.date = target.value;
                this.saveEntries();
            });

            row.querySelector(".tracker__workout").addEventListener("change", ({ target }) => {
                data.workout = target.value;
                this.saveEntries();
            });

            row.querySelector(".tracker__name").addEventListener("change", ({ target }) => {
                data.name = target.value;
                this.saveEntries();
            });

            // row.querySelector(".tracker__post").addEventListener("change", ({ target }) => {
            //     data.name = target.value;
            //     this.saveEntries();
            // });


            row.querySelector(".tracker__delete").addEventListener("click", () => {
                this.deleteEntry(data);
            });

            tableBody.appendChild(row);
        };

        tableBody.querySelectorAll(".tracker__row").forEach(row => {
            row.remove();
        });

        this.entries.forEach(data => addRow(data));
    }

    addEntry(data) {
        this.entries.push(data);
        this.saveEntries();
        this.updateView();
    }

    deleteEntry(dataToDelete) {
        this.entries = this.entries.filter(data => data !== dataToDelete);
        this.saveEntries();
        this.updateView();
    }
}

const app = document.getElementById("app");

const wt = new WorkoutTracker(app);

window.wt = wt;

/*

       <td >
                <select class="tracker__post">
                    <option value="Electrical Engineer">Electrical Engineer</option>
                    <option value="Sofware Engineer">Sofware Engineer</option>
                    <option value="Web Developer">Web Developer</option>
                    <option value="Data Engineer">Data Engineer</option>
                    <option value="App Developer">App Developer</option>
                </select>
            </td>
*/