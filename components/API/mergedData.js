import { getBandMembers, getBands, getSingleBand } from './bandData';
import { getSingleMember } from './memberData';

const viewBandDetails = (bandFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleBand(bandFirebaseKey), getBandMembers(bandFirebaseKey)])
    .then(([bandObject, bandMembersArray]) => {
      resolve({ ...bandObject, members: bandMembersArray });
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
