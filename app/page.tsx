import AuthButton from '@/components/AuthButton';
import NavBar from '@/components/NavBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
    return (
        <div className="flex w-full flex-col gap-5 items-center">
        <NavBar />
        <main >
            <div className="flex max-w-4xl px-4 py-8">
            <Header />
            </div>
        </main>
        <Footer />
        </div>
    );
}