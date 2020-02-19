export class Utils {
  public static areObjectsEqual(objA: any, objB: any): boolean {
    if (!objA || !objB) {
      return objA === objB;
    }

    let isEqual = true;

    for (const key of Object.keys(objA)) {
      if (objA[key] instanceof Array) {
        if (!Utils.areArraysEqual(objA[key], objB[key])) {
          isEqual = false;
        }
      } else if (objA[key] instanceof Date) {
        if (objA[key] !== objB[key]) {
          isEqual = false;
        }
      } else if (objA[key] instanceof Object) {
        if (!Utils.areObjectsEqual(objA[key], objB[key])) {
          isEqual = false;
        }
      } else if (objA[key] !== objB[key]) {
        isEqual = false;
      }
    }

    return isEqual;
  }

  public static arrayComparer(otherArray: any[]): any {
    return (current: any) => {
      return (
        otherArray.filter(other => {
          return Utils.areObjectsEqual(current, other);
        }).length === 0
      );
    };
  }

  public static areArraysEqual(A: any[], B: any[]): boolean {
    if (!A || !B) {
      return A === B;
    }

    if (A.length !== B.length) {
      return false;
    }

    if (!A.length) {
      return true;
    }

    const uniqueToA = A.filter(Utils.arrayComparer(B));

    if (uniqueToA.length) {
      return false;
    }

    const uniqueToB = B.filter(Utils.arrayComparer(A));

    if (uniqueToB.length) {
      return false;
    }

    return true;
  }
}
