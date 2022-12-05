import * as yup from "yup";
import {SchemaOf} from "yup";
import {IClientRequest} from "../../interfaces/clients";

const clientSchema: SchemaOf<IClientRequest> = yup.object().shape({
    username: yup.string().required("username is required"),
    name: yup.string().required("name is required"),
    password: yup.string().required("password is required"),
});

export {clientSchema};
