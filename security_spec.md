# Firebase Firestore Security Specification (TDD SPEC)

## 1. Data Invariants
- Any anonymous visitor can create/write a contact entry in `/contacts/`.
- No visitor can READ, LIST, UPDATE, or DELETE any contact entry in `/contacts/` after it has been created to prevent leaks of PII.
- All created documents in `/contacts/` must conform to the required schema:
  - `name`: string, length between 1 and 100 characters.
  - `email`: string, length between 3 and 100 characters.
  - `subject`: string, length between 0 and 200 characters.
  - `message`: string, length between 1 and 5000 characters.
  - `createdAt`: sever timestamp (`request.time`).
- Document IDs must be valid alphanumeric sequences up to 128 characters.

## 2. The "Dirty Dozen" Threat Payloads (Security Audit Vectors)
Every single one of these vectors must result in a strict `PERMISSION_DENIED` rule gate action.

1. **Unsigned-in Read Attack**: Attempting to execute `get` or `list` on `/contacts/{contactId}` as an unauthenticated visitor.
2. **PII Scraping Attack**: Attempting to execute `list` on `/contacts` to dump all user email addresses.
3. **Malicious Delete Attack**: Attempting to delete a submitted contact entry to destroy evidence or disrupt support.
4. **Malicious Edit / Override**: Attempting to modify or update an existing message body.
5. **No-Name Shadow Injection**: Attempting to create a contact without the mandatory `name` field.
6. **No-Email Shadow Injection**: Attempting to create a contact without the mandatory `email` field.
7. **No-Message Shadow Injection**: Attempting to create a contact without the mandatory `message` text.
8. **Client Timestamp Spoofing (createdAt)**: Creating an entry where `createdAt` is a custom client-supplied past or future date string instead of `request.time`.
9. **Buffer Overflow Message Exploit**: Injecting a custom generated 15MB massive text buffer under the `message` field to inflate resource bills.
10. **Huge Name Payload Attack**: Injecting a 20KB username to flood Firestore indexes.
11. **Malicious Document ID Poisoning**: Specifying a document ID containing arbitrary paths, SQL escapes, or recursive patterns (`../contacts/root`).
12. **Ghost Field Poisoning**: Inserting extra unauthorized fields (e.g., `isVerified: true`, `score: 1000`) into the collection schema.

## 3. Security Audit & Invariant Assertions
These payloads and permissions will be hard-verified against our strict zero-trust Firestore Security Rules in the next phase.
