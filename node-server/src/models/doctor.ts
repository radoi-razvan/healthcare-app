import IFamily from "./family";
import IFacility from "./facility";

interface IDoctor {
  resourceType: string;
  id: string;
  name: IFamily[];
  facility: IFacility[];
  active: boolean;
}

export default IDoctor;
