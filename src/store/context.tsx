import { createContext } from "react";
import { StoreValueType } from '../types/types';

const Context = createContext<StoreValueType>({});
export default Context;