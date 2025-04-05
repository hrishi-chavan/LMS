function maskPhoneNumber(str, visibleStart = 5, visibleEnd = 3) {
    if (str.length <= visibleStart + visibleEnd) {
        return str;  // Return as-is if the string is too short to mask
    }

    const start = str.slice(0, visibleStart);  // Get visible start part
    const end = str.slice(-visibleEnd);  // Get visible end part
    const masked = '*'.repeat(str.length - visibleStart - visibleEnd);  // Mask middle part

    return start + masked + end;  // Combine the parts
}

function queryString() {
    const str1 = window.location.href.split('?')[1];
    const params = {};

    if (str1) {
        const pairs = str1.split('&');
        for (const pair of pairs) {
            const [key, value] = pair.split('=');
            params[key] = decodeURIComponent(value);
                          //.replace(/\+/g, ' '));
        }
    }

    return params;
}