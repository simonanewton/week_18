const request = indexedDB.open('budget', 1);

request.onupgradeneeded = (event) => {
    const db = event.target.result;
    db.CreateObjectStore('pending', { autoincrement: true });
};

request.onsuccess = (event) => {
    const db = event.target.result;
    if (navigator.onLine) checkDB();
};

request.onerror = (event) => {
    console.log(event.target.errorCode);
}

function saveRecord(record) {
    const transaction = db.transaction(['pending'], 'readWrite');
    const store = transaction.objectStore('pending');
    store.add(record);
}

function checkDB() {
    const transaction = db.transaction(['pending'], 'readWrite');
    const store = transaction.objectStore('pending');
    const getAll = store.getAll();

    getAll.onsuccess = () => {
        if (getAll.result.length > 0) {
            fetch('/api/transaction/bulk', {
                method: "POST",
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json"
                }
            }).then(response => response.json())
                .then(() => {
                    const transaction = db.transaction(['pending'], 'readWrite');
                    const store = transaction.objectStore('pending');
                    store.clear();
                });
        }
    }
}

window.addEventListener('online', checkDB);
