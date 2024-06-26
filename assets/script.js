function calculate() {
    let n = Number(document.getElementById("n").value);
    let tu = document.getElementById("tut").value.split(" ").map(Number);
    let ca = document.getElementById("cat").value.split(" ").map(Number);
    let sap = Number(document.getElementById("sap").value);

    let eid = document.getElementById("external");
    let iid = document.getElementById("internal");
    let err = document.getElementById("err");

    // Clear previous results and error messages
    iid.textContent = "";
    eid.textContent = "";
    err.textContent = "";

    // Validation checks
    if (!n || n < 1 || n > 20) {
        err.textContent = "Please enter a valid number of best marks (n) between 1 and 20.";
        return;
    }

    if (tu.length < n || tu.length >= 20) {
        err.textContent = "The number of tutorial marks entered must be at least n and less than 20.";
        return;
    }

    if (ca.length < 1 || ca.length > 3) {
        err.textContent = "Please enter 1, 2, or 3 CAT marks.";
        return;
    }

    if (![2, 3, 4, 5].includes(sap)) {
        err.textContent = "SAP marks must be 2, 3, 4, or 5.";
        return;
    }

    // Sort tutorial and CAT marks in descending order
    tu.sort((a, b) => b - a);
    ca.sort((a, b) => b - a);

    // Take the best n tutorial marks and best 2 CAT marks
    let t = tu.slice(0, n);
    let cat = ca.slice(0, 2);

    let tl = 0;
    if (t[0] <= 20) {
        tl = (t.reduce((acc, val) => acc + val, 0) * 5) / n;
    } else if (t[0] <= 100 && t[0] > 20) {
        tl = t.reduce((acc, val) => acc + val, 0) / n;
    }

    if (t[0] > 100) {
        err.textContent = "Tutorial Marks should not be greater than 100.";
        return;
    }

    if (cat[0] > 100) {
        err.textContent = "CAT Marks should not be greater than 100.";
        return;
    }

    let tt = (tl * 15) / 100;
    let cc = cat.reduce((acc, val) => acc + val, 0) / (2 * 5); // Calculate average of best 2 CAT marks
    let tot = cc + tt + sap;
    let e = ((50 - tot) * 10) / 6;

    if (tot >= 0 && tot < 40 && e >= 0 && e < 100) {
        iid.textContent = "Internal: " + tot.toFixed(2) + "/40";
        eid.textContent = "Sem Marks: " + e.toFixed(2) + "/100";
        err.textContent = ""; // Clear previous errors
        console.log(t, tt, cc);
        console.log("Total Marks= ", tot, "/40");
        console.log("External Marks to Score= ", e, "/100");
    } else {
        if (cc > 20 || cc < 0) {
            err.textContent = "CAT marks should be between 0 and 100 inclusive.";
        } else if (tt < 0 || tt > 100) {
            err.textContent = "Tutorial marks should be between 0 and 100 inclusive.";
        } else {
            err.textContent = "Invalid calculation results.";
        }
    }
}
