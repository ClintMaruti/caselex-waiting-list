import Logo from "@/assets/Caselex-Logo-F.png";
import HeroImg from "@/assets/HeroImg.png";
// import { SendEmailCampaign } from "@/services/Brevo";
import { Button } from "@/components/ui/button";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { countries } from "@/country";
import axios from "axios";
import { BookmarkPlus, Database, FolderSearch, Scale } from "lucide-react";
import { useState } from "react";
import Select from "react-select";
import { toast } from "sonner";
import { Input } from "../components/ui/input";

const country_lst = countries.map((ct) => ({ value: ct.name, label: ct.name }));

const i_am_a = ["Student", "Academia", "Own law firm", "Lawyers in a firm with less than 20 employees", "Lawyers in a firm with less than 20 - 50 employees", "Lawyers in a firm with over 50 employees", "Other"];
const i_am = i_am_a.map((op) => ({ label: op, value: op }));
export const LandingPage = () => {
    const [email, setEmail] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [country, setCountry] = useState<string | undefined>();
    const [iam, setIam] = useState<string | undefined>();
    const [isLoading, setLoading] = useState<boolean>(false);
    const [isEmailSent, setEmailSent] = useState<boolean>(false);
    const [emailExists, setEmailExists] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        e.preventDefault();
        const formData = new FormData();
        formData.append("email", email);
        formData.append("first_name", firstName);
        formData.append("last_name", lastName);
        country ? formData.append("country", country) : formData.append("country", "");
        iam ? formData.append("i_am_a", iam) : formData.append("iam", "");
        try {
            const sendEmail = await axios.post("https://caselex-waitlist-e8d711942ce5.herokuapp.com/api/send-campaign", { email: email });
            if (sendEmail.data.id) {
                const response = await fetch("https://script.google.com/macros/s/AKfycbwWeuHqYdz-NlO9hVvPb_WSya4PVmVXf2FVtjvtBRKrHcqcDujlK2u1iofUDukvzzGu/exec", {
                    method: "POST",
                    body: formData,
                });
                if (response.ok) {
                    toast.success("Thank you! You will hear from us shortly 😊");
                    setEmail("");
                    setEmailSent(true);
                    setLoading(false);
                } else {
                    setLoading(false);
                }
            } else {
                toast.error("Email already submitted! Thank You 😊");
                setEmailExists(true);
            }
        } catch (error) {
            console.error("Error submitting email:", error);
            toast.error("Email already submitted! Thank You 😊");
            setEmailExists(true);
            setLoading(false);
        }
    };
    return (
        <div className="w-full h-screen relative grid md:grid-cols-2">
            <div className="flex flex-col px-5 space-y-8 justify-center">
                <img src={Logo} width="30%" className="p-3" />
                <div className="flex flex-col items-center justify-around gap-10">
                    <h1 className="w-full text-4xl inline-flex h-max text-center justify-center  items-center text-transparent bg-gradient-to-br from-[#FDA403] to-[#282828] bg-clip-text">
                        Your trusted, legal <br />
                        ally and compliance guide
                    </h1>
                    <p className="text-center">Join the waitlist for exclusive access when we launch</p>
                    {isEmailSent ? (
                        <div className="flex justify-center">
                            <p>Thank you for joining our waitlist. You'll hear from us shortly 😊</p>
                        </div>
                    ) : (
                        <form className="flex flex-col gap-3 justify-center items-center" onSubmit={handleSubmit}>
                            {emailExists ? (
                                <div className="w-full p-2 bg-red-100 border border-red-200 rounded-sm">
                                    <p className="text-center text-sm">Oops! Email already submitted! Thank you 😊</p>
                                </div>
                            ) : null}
                            <fieldset disabled={isLoading} className="grid md:grid-cols-2 gap-4 w-full">
                                <Input type="text" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="sm:w-auto" required />
                                <Input type="text" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="sm:w-auto" required />
                                <Select isDisabled={isLoading} options={country_lst} placeholder="Search for country..." onChange={(e) => setCountry(e?.value)} />
                                <Select isDisabled={isLoading} options={i_am} placeholder="I am a ..." onChange={(e) => setIam(e?.value)} />
                            </fieldset>
                            <fieldset disabled={isLoading} className="flex flex-col justify-center w-full items-center">
                                <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="" required />
                                <Button type="submit" className="sm:w-auto my-4">
                                    Join waiting list
                                </Button>
                            </fieldset>
                        </form>
                    )}
                </div>
                <div className="flex gap-2">
                    <Scale size="40px" />
                    <div className="flex flex-col">
                        <p className="text-[#9E9E9E] text-sm">Case Law Research</p>
                        <p className="text-sm">Save time finding and analysing court decisions relevant to your legal issue. Our Ai platform is able to aggregate cases from different court levels and intelligently help you analyse them.</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Database />
                    <div className="flex flex-col">
                        <p className="text-[#9E9E9E] text-sm">Exhaustive repository</p>
                        <p className="text-sm">Find cases from over 5 countries including Kenya, Ghana, South Africa, Nigeria, Tanzania, Zambia and Zimbabwe.</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <BookmarkPlus />
                    <div className="flex flex-col">
                        <p className="text-[#9E9E9E] text-sm">Search history + bookmarking</p>
                        <p className="text-sm">You can view your search history and be able to bookmark cases for future reference.</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <FolderSearch />
                    <div className="flex flex-col">
                        <p className="text-[#9E9E9E] text-sm">Advanced targeted search</p>
                        <p className="text-sm">With our advanced targeted search, you can narrow down your search and focus on a particular area or jurisdiction.</p>
                    </div>
                </div>
            </div>
            <div className="hidden sm:flex relative">
                <div className="w-full h-full bg-cover absolute right-0" style={{ backgroundImage: `url(${HeroImg})` }}></div>
            </div>
        </div>
    );
};
