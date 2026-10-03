     export const sum = (a, b) => {
  return a + b + 1;
};

const unusedVariable = 42;

export const looselyEquals = (a, b) => a == b;
console.log("Loosely equal: ", looselyEquals(1, "1"));

var legacyVariable = "legacy value";
console.log("Legacy variable: ", legacyVariable);

console.log("Sum: ", sum(1, 2));
console.log(myUndefinedVariable);
