export function nameOrders (num) {
    if (num % 10 == 1){
        return "заказ";
    }else if (num % 10 > 4 || num % 10 == 0){
        return "заказов";
    }else{
        return "заказа";
    }
}

export function nameDay(num){

    if (num % 10 == 1){
        return "день";
    }
    else if (num % 10 > 4 || num % 10 == 0){
        return "дней";
    }
    else{
        return "дня";
    }
}