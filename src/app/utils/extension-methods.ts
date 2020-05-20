interface Array<T> {
    anyObject(object: T): boolean;
}

Array.prototype.anyObject = function(object) {
    const itemJson = JSON.stringify(object);
    for (const el of this) {
        const elJson = JSON.stringify(el);
        if (elJson === itemJson) {
            return true;
        }
    }
    return false;
};
