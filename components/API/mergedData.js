import { getBandMembers, getBands, getSingleBand } from './bandData';
import { getSingleMember } from './memberData';

const viewBandDetails = (bandFirebaseKey) => new Promise((resolve, reject) => {
  getSingleBand(bandFirebaseKey)
    .then((bandObject) => {
      getBandMembers(bandFirebaseKey)
        .then((members) => {
          resolve({ bandObject, members });
        })
        .catch((error) => reject(error));
    })
    .catch((error) => reject(error));
});

const viewMemberDetails = (memberFirebaseKey) => new Promise((resolve, reject) => {
  getSingleMember(memberFirebaseKey)
    .then((memberObject) => {
      getBands(memberObject.uid)
        .then((bands) => {
          resolve({ memberObject, bands });
        })
        .catch((error) => reject(error));
    });
});

export { viewBandDetails, viewMemberDetails };
