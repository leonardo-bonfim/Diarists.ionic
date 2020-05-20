export class ApiResponse<T> {
    data: T;
    errors: Array<any> | any;
}
