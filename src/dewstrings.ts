declare global {
  // tslint:disable-next-line:interface-name
  interface String {
    /**
     * Capitalize the string
     */
    capitalize(): string;
    /**
     * Capitalize all string's words
     */
    capitalizeAllWords(): string;
    /**
     * Check if the string is a valid email
     */
    isValidEmail(): boolean;
    /**
     * Remove last character in the string
     */
    removeLastCharacter(): string;
    /**
     * Remove first character of the string
     */
    removeFirstCharacter(): string;
    /**
     * Remove the character at index value
     * @param index the index value to remove
     */
    removeCharacterAt(index: number): string;
    /**
     * Generate a random string
     * @param length the lenght of return string
     */
    randomString(length: number, type: StringTypes): string;
    /**
     * Remove all occurences of a char
     * @param char to remove
     */
    removeChar(char: string): string;
    /**
     * Check if string contains a substring
     * @param sub to find
     */
    hasSubstring(sub: string): boolean;
    /**
     * Return the word count of the string
     */
    wordCount(): number;
    /**
     * Remove all duplicates spaces
     */
    RemoveDuplicateSpaces(): string;
    /**
     * Prevent null/undefined reference
     */
    toEmptyIfNull(): string;
    /**
     * Check if string is null, undefined or empty
     */
    isNullOrEmpty(): boolean;
    /**
     * Check if is a number from regex ^[0-9]*(\,{1}|\.{1})?[0-9]*$
     */
    isNumber(): boolean;
    /**
     * Check if string contains only alphabetic characters
     */
    isAlphabetic(): boolean;
    /**
     * Format a string with values
     */
    format(values: string[]): string;
  }
}

export enum StringTypes {
  All,
  Alpha,
  Number,
  AlphaNumber,
}

export default function init() {
  String.prototype.capitalize = function(): string {
    return this[0].toUpperCase() + this.substr(1, this.length - 1);
  };
  String.prototype.capitalizeAllWords = function(): string {
    const words = this.replace(/\s+/g, " ")
      .trim()
      .split(' ');
    for (let item of words) {
      item = item.capitalize();
    }
    return words.join(' ');
  };
  String.prototype.isValidEmail = function(): boolean {
    // tslint:disable-next-line:max-line-length
    const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(this.toString());
  };
  String.prototype.removeLastCharacter = function(): string {
    return this.substr(0, this.length - 2);
  };
  String.prototype.removeFirstCharacter = function(): string {
    return this.substr(1, this.length - 1);
  };
  String.prototype.removeCharacterAt = function(index: number): string {
    if (index + 1 < this.length) return this.substring(0, index) + this.substring(index + 1, this.length);
    else throw new RangeError();
  };
  String.prototype.randomString = function(length: number, type: StringTypes): string {
    let result = '';
    let pool = '';
    if (type === StringTypes.All) pool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!£$%&/()=?^+#@';
    if (type === StringTypes.Alpha) pool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (type === StringTypes.Number) pool = "0123456789";
    if (type === StringTypes.AlphaNumber) pool = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 5; i++) result += pool.charAt(Math.floor(Math.random() * pool.length));
    return result;
  };
  String.prototype.removeChar = function(char: string) {
    return this.replace(char, "");
  };
  String.prototype.hasSubstring = function(sub: string): boolean {
    return this.search(sub) > -1;
  };
  String.prototype.wordCount = function(): number {
    return this.replace(/[ ]{2,}/g, " ")
      .trim()
      .split(" ").length;
  };
  String.prototype.toEmptyIfNull = function(): string {
    return this === undefined || this === null ? "" : this.toString();
  };
  String.prototype.isNullOrEmpty = function(): boolean {
    return this.toEmptyIfNull() === "" ? true : false;
  };
  String.prototype.isNumber = function(): boolean {
    return /^[0-9]*(\,{1}|\.{1})?[0-9]*$/g.test(this.toString());
  };
  String.prototype.isAlphabetic = function(): boolean {
    return /^[A-za-z]*$/g.test(this.toString());
  };
  String.prototype.format = function(values: string[]): string {
    let temp = this;
    if (values.length > 0) {
      for (const element of values) {
        if (temp !== undefined && temp !== null) {
          temp = temp.replace(/{[0-9]+}/i, element);
        }
      }
    }
    return temp.toString();
  };
}