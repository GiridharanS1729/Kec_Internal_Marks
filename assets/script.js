function calculate() {
    // Get input values
    let n = Number(document.getElementById("n").value);
    let tu = document.getElementById("tut").value.split(" ").map(Number);
    let ca = document.getElementById("cat").value.split(" ").map(Number);
    let sap = document.getElementById("sap").value;

    // Get elements to display results and errors
    let eid = document.getElementById("external");
    let iid = document.getElementById("internal");
    let err = document.getElementById("err");

    // Check if all values are entered
    // if (!n || !sap || tu.length === 0 || ca.length === 0) {
    //     err.textContent = "Please enter all values.";
    //     return;
    // }

    // Parse SAP value to a number
    sap = Number(sap);

    // Check if n is greater than the number of tutorial marks entered
    if (n > tu.length) {
        err.textContent = "n must be lesser than or equal to the number of tutorial marks entered.";
        return;
    }

    // Sort tutorial and CAT marks in descending order
    tu.sort((a, b) => b - a);
    ca.sort((a, b) => b - a);

    // Take the best n tutorial marks
    let t = tu.slice(0, n);
    // Take the best 2 CAT marks
    let cat = ca.slice(0, 2);

    // Calculate total tutorial marks
    let tl = 0;
    if (t[0] <= 20) {
        tl = (t.reduce((acc, val) => acc + val, 0) * 5) / n;
    } else if (t[0] <= 100 && t[0] > 20) {
        tl = t.reduce((acc, val) => acc + val, 0) / n;
    }

    // Check if tutorial marks are valid
    if (t[0] > 100) {
        err.textContent = "Tutorial Marks should not be greater than 100.";
        return;
    }

    // Check if CAT marks are valid
    if (cat[0] > 100) {
        err.textContent = "CAT Marks should not be greater than 100.";
        return;
    }

    // Calculate total internal marks
    let tt = (tl * 15) / 100;
    let cc = cat.reduce((acc, val) => acc + val, 0) / 2.5;
    let tot = cc + tt + sap;
    let e = ((50 - tot) * 10) / 6;

    // Display internal and external marks
    iid.textContent = "Internal: " + tot.toFixed(2) + "/40";
    eid.textContent = "Sem Marks: " + e.toFixed(2) + "/100";

    // Check if calculated marks are within valid range
    if (tot < 40 && tot > 0 && e > 0 && e < 100) {
        err.textContent = ""; // Clear previous errors
        console.log(t, tt, cc);
        console.log("Total Marks= ", tot, "/40");
        console.log("External Marks to Score= ", e, "/100");
    } else {
        if (cc > 20 || cc < -1) {
            iid.textContent = "";
            eid.textContent = "";
            err.textContent = "CAT marks should be between 0 and 100 inclusive.";
        } else if (tt < 0 || tt > 100) {
            err.textContent = "Tutorial marks should be between 0 and 100 inclusive.";
        }
    }
}
