function palindrome(str) {
    let arr = str.toLowerCase().match(/[a-z]|[A-Z]|[0-9]/g);
    let count = 0;
    if (arr == null) {
        return true;
    } else {
        for (let i = 0; i < arr.length / 2; i++) {
            if (arr.length % 2 == 0) {
                if (arr[i] == arr[(arr.length - 1) - i]) {
                    count++;
                }
            } else {
                arr.splice(((arr.length + 1) / 2) - 1, 1);
                if (arr[i] == arr[(arr.length - 1) - i]) {
                    count++;
                }
            }
        }
        if (arr.length % 2 == 0) {
            if ((arr.length / 2) == count) {
                return true;
            } else { return false }
        } else {
            if (((arr.length + 1) / 2) - 1 == count) {
                return true;
            } else { return false }

        }
    };


}

palindrome("eye");