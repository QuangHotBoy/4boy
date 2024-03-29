let MyBank = {
    BANK_ID: "MB",
    ACCOUNT_NO: "0344436724",
    AMOUNT: "100000",
    DESCRIPTION: "Thanh toán đơn hàng",
    ACCOUNT_NAME: "LUONG VAN QUOC",
}

document.addEventListener("DOMContentLoaded", () => {
    let QRCode = `https://img.vietqr.io/image/${MyBank.BANK_ID}-${MyBank.ACCOUNT_NO}-compact2.png?amount=${MyBank.AMOUNT}&addInfo=${MyBank.DESCRIPTION}&accountName=${MyBank.ACCOUNT_NAME}`;
});