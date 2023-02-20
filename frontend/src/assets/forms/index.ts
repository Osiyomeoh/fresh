import { FormDefinition } from '../../@types/form-def';
import mxsDJson from './mxsD.json';

const mxsD = mxsDJson as FormDefinition;

const exports = {
  mxsD,
  [mxsD.slug]: mxsD,
};

export default exports;
