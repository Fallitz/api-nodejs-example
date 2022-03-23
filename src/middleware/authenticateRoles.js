module.exports = async (tokenRole, type) => {  
    let result = false;
    type.forEach(element => {
        if(element == tokenRole){
            result = true;
        }
    });
    return result;
}