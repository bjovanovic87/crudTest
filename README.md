# Overall Impression

---

CRUD Methotds to test in this case were POST,PUT,DELET & GET

---

GET
-As stated in the file API endpoint key quota is 10 but if you call get method user can see that 11 keys are possible to enter which should not be the case as requirement says 10

---

POST & PUT
-Post and put are working in reverse. PUT is responsible for generation of new key-values and POST is responsible for the update.Common practise is vise versa.
-Put is is most cases responsible for update & POST for generation.

---

Also important thing to notice is if users tries to perform some negative test case usually error messages does not provide sufficient information

---

Things which I would usually test in APIs are as follows:

1. Happy Path - this is testing of API with all valid MANDATORY parameters
2. Positive testing - testing with parameters which are mandatory + optional to make sure they are not producing any errors.
3. Negative test cases - trying to execute calls with valid inputs that attemps to execute invalid operation. trying to execut calls with invalid inputs
4. Security Test cases - in cases if there are authentication & authorization execute calls which are verifing that there are working fine. They can be both valid & invalid scenarios
