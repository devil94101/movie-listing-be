import { HttpException, HttpStatus } from '@nestjs/common';
import * as admin from 'firebase-admin';

export async function getData(
  collection: string,
  where: Record<
    string,
    { opr: FirebaseFirestore.WhereFilterOp; value: string } | any
  > = {},
) {
  const firestore = admin.firestore();
  try {
    const query = await firestore.collection(collection);
    let whereCondition = null;
    for (const key in where) {
      if (where.hasOwnProperty(key)) {
        const value = where[key];
        if (Array.isArray(value)) {
          whereCondition = query.where(key, 'in', value);
        } else if (typeof value === 'object') {
          whereCondition = query.where(key, value.opr, value.value);
        } else {
          whereCondition = query.where(key, '==', value);
        }
      }
    }
    if (whereCondition) {
      const x = await whereCondition.get();
      return x.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
    } else {
      const x = await query.get();
      return x.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
    }
  } catch (err) {
    throw new HttpException(
      err.message,
      err.status || HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

export async function getDataById(collection: string, id: string) {
  const firestore = admin.firestore();
  try {
    const x = await firestore.collection(collection).doc(id).get();
    if (!x.exists) {
      throw new HttpException(
        'Invalid ID!' , HttpStatus.INTERNAL_SERVER_ERROR,
      );;
    }
    return x.data();
  } catch (err) {
    throw new HttpException(
      err.message,
      err.status || HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

export async function addRow(collection: string, data: Record<string, any>) {
  const firestore = admin.firestore();
  try {
    const x = await firestore.collection(collection).add(data);
    return x.id;
  } catch (err) {
    throw new HttpException(
      err.message,
      err.status || HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

// async function deleteMany(collection: string, where: Record<string, any>) {
//     try {
//         let ref = this.firestore.collection(collection);
//         for (const key in where) {
//             if (where.hasOwnProperty(key)) {
//                 const value = where[key];
//                 if (Array.isArray(value)) {
//                     ref.where(key, 'in', where[key])
//                 } else {
//                     ref.where(key, '==', where[key])
//                 }
//             }
//         }
//         let snap = await ref.get();
//         var batch = this.firestore.batch();
//         snap.forEach(function (doc) {
//             // For each doc, add a delete operation to the batch
//             batch.delete(doc.ref);
//         });

//         // Commit the batch
//         return await batch.commit();
//     }
//     catch (err) {
//         return {
//             status: 'error',
//             message: err.message
//         }
//     }

// }

export async function deleteById(collection: string, id: string) {
  const firestore = admin.firestore();
  return await firestore.collection(collection).doc(id).delete();
}

// async function updateMany(collection: string, data: Record<string, any>, where: Record<string, any> = {}) {
//     try {
//         let ref = await this.firestore.collection(collection);
//         for (const key in where) {
//             if (where.hasOwnProperty(key)) {
//                 const value = where[key];
//                 if (Array.isArray(value)) {
//                     ref.where(key, 'in', where[key])
//                 } else {
//                     ref.where(key, '==', where[key])
//                 }
//             }
//         }
//         let snap = await ref.get();
//         var batch = this.firestore.batch();
//         snap.forEach(function (doc) {
//             // For each doc, add a update operation to the batch
//             batch.update(doc.ref, data);
//         });

//         // Commit the batch
//         return await batch.commit();

//     }
//     catch (err) {
//         console.log(err);
//         return {
//             status: 'error',
//             message: err.message
//         }
//     }
// }

export async function updateById(
  collection: string,
  id: string,
  data: Record<string, any>,
) {
  console.log(data)
  try {
    const firestore = admin.firestore();
    return await firestore
      .collection(collection)
      .doc(id)
      .set(data, { merge: true });
  } catch (err) {
    throw new HttpException(
      err.message,
      err.status || HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

export async function addById(
  collection: string,
  id: string,
  data: Record<string, any>,
) {
  try {
    const firestore = admin.firestore();
    return await firestore.collection(collection).doc(id).set(data);
  } catch (err) {
    const firestore = admin.firestore();
    return await firestore
      .collection(collection)
      .doc(id)
      .set(data, { merge: true });
  }
}


