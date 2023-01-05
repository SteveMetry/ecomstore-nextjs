import { Layout } from ".components/Layout";

export default function PrivacyPolicyPage() {
  return (
    <Layout
      navbarChildren={<h1 className="text-xl font-thin">Privacy Policy</h1>}
    >
      <div className="font-thin text-2xl p-6 m-4">
        We collect personal information from you, including information about
        your:
        <br />
        - name
        <br />
        - contact information
        <br />
        <br />
        We collect your personal information in order to:
        <br />
        - Create an Account for the user on our online shopping website
        <br />
        - be able to contact you directly if necessary
        <br />
        <br />
        Providing some information is optional. If you choose not to enter your
        personal information, we will be unable to process your checkouts
        online.
        <br />
        <br />
        You have the right to ask for a copy of any personal information we hold
        about you, and to ask for it to be corrected if you think it is wrong.
        <br />
        <br />
        You have the right to ask for a copy of any personal information we hold
        about you, and to ask for it to be corrected if you think it is wrong.
        If you would like to ask for a copy of your information, or to have it
        corrected, please contact us at help@sendnet.co.
        <br />
      </div>
    </Layout>
  );
}
