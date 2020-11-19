import Fingerprint2 from "fingerprintjs2";



Fingerprint2.get(components => {
     const values = components.map(component => component.value);
     const murmur = Fingerprint2.x64hash128(values.join(""), 31);
     return murmur
   });

//    export default 