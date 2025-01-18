export class Constants {
  static META_NAME = "FraudChecker.org";
  static META_TITLE = "Free Online Customer Quality Checker";
  static META_DESCRIPTION =
    "কাস্টমারদের ফোন নাম্বার ব্যবহার করে তাদের বিগত দিনের অনলাইন কেনাকাটার রিপোর্টসহ সব কুরিয়ার সার্ভিসের অর্ডার, সফল ডেলিভারি, এবং রিটার্নের হিসাব দেখুন। পাশাপাশি, প্রতিটি কাস্টমারের অর্ডার ডেলিভারি, রিটার্ন, এবং বুকিংয়ের রেশিও সহজেই বিশ্লেষণ করুন এক প্ল্যাটফর্মে।";
  static NODE_ENV = process.env.NODE_ENV;
  static COURIER_EENDPOINT = process.env.COURIER_EENDPOINT!;
  static COURIER_TOKEN = process.env.COURIER_TOKEN!;
}
