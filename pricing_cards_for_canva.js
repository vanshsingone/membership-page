// Dynamic event binding for pricing cards page actions
document.addEventListener('DOMContentLoaded', () => {
    // Print/Save as PDF trigger binding
    const printPdfBtn = document.getElementById('printPdfBtn');
    if (printPdfBtn) {
        printPdfBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.print();
        });
    }
});
