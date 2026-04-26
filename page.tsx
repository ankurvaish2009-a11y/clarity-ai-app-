"use client"

import Link from "next/link";
import Script from "next/script";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Shield, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { sessionStore } from "@/lib/store";

declare global {
  interface window {
    Razorpay: any;
  }
}

export default function Home() {
  const router = useRouter();
  const { toast } = useToast();

  const handleUnlockClick = () => {
    const userData = sessionStore.getUserData();
    if (!userData) {
      toast({
        title: "Analysis Required",
        description: "Please complete your free analysis first so we can generate your report.",
      });
      router.push("/analyze");
      return;
    }

    // Razorpay logic with placeholder key
    const RAZORPAY_KEY = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_dummy123";
    
    const options = {
      key: RAZORPAY_KEY,
      amount: 49900,
      currency: "INR",
      name: "Clarity Flow",
      description: "Premium Clarity Report",
      handler: function (response: any) {
        router.push("/result");
      },
      prefill: {
        name: userData.name,
      },
      theme: {
        color: "#004EBF",
      },
    };

    try {
      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (e) {
      console.error("Razorpay error", e);
      router.push("/result"); // Fallback for dev/demo
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Script 
        src="https://checkout.razorpay.com/v1/checkout.js" 
        strategy="afterInteractive"
      />
      
      {/* Hero Section */}
      <section className="w-full py-20 px-4 flex flex-col items-center justify-center text-center space-y-8 bg-gradient-to-b from-white to-background">
        <div className="max-w-4xl space-y-6">
          <h1 className="text-4xl md:text-7xl font-bold tracking-tight text-primary font-headline animate-in fade-in slide-in-from-bottom-4 duration-1000">
            You are <span className="text-secondary-foreground underline decoration-accent decoration-wavy underline-offset-8">1 decision away</span> from changing your life
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 delay-200 duration-1000">
            Clarity Flow uses advanced AI to analyze your life path, identify hidden mistakes, and provide logical, practical advice for your next big step.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-4 delay-300 duration-1000">
            <Button size="lg" asChild className="text-lg px-8 h-14 rounded-full bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20">
              <Link href="/analyze" className="flex items-center gap-2">
                Start My Analysis <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-8 h-14 rounded-full border-primary/20 hover:bg-accent/30">
              <Link href="/chat">Speak with AI Coach</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container px-4 py-20 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 bg-accent rounded-xl flex items-center justify-center mb-6">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3 font-headline">Free Insights</h3>
            <p className="text-muted-foreground">
              Get an immediate AI summary of your current situation and identify one major hidden mistake holding you back.
            </p>
          </div>
          <div className="p-8 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 bg-accent rounded-xl flex items-center justify-center mb-6">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3 font-headline">Premium Decisions</h3>
            <p className="text-muted-foreground">
              Unlock a detailed, logical deep-dive with a step-by-step plan and future predictions available in English and Hindi.
            </p>
          </div>
          <div className="p-8 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 bg-accent rounded-xl flex items-center justify-center mb-6">
              <CheckCircle2 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3 font-headline">Personal AI Coach</h3>
            <p className="text-muted-foreground">
              Ongoing 24/7 support through our Gemini-powered chatbot clone for follow-up questions and daily clarity.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container px-4 py-20 mx-auto text-center border-t border-primary/5">
        <div className="max-w-2xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold font-headline text-primary">Simple, One-Time Pricing</h2>
          <p className="text-muted-foreground text-lg">
            Get your comprehensive life-path analysis, logical advice, and future predictions for a single investment.
          </p>
          <div className="p-12 rounded-3xl bg-white border-2 border-primary/20 shadow-2xl space-y-6 relative overflow-hidden">
             <div className="absolute top-0 right-0 bg-primary text-white px-6 py-2 rounded-bl-2xl font-bold text-sm">BEST VALUE</div>
             <h3 className="text-2xl font-bold">Premium Clarity Report</h3>
             <div className="text-5xl font-bold text-primary">₹499</div>
             <p className="text-muted-foreground italic">"One decision away from clarity."</p>
             <ul className="text-left space-y-3 max-w-xs mx-auto py-6">
                <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-green-500" /> Logical Deep Dive</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-green-500" /> Step-by-Step Action Plan</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-green-500" /> Hindi & English Support</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-green-500" /> Future Path Prediction</li>
             </ul>
             <Button onClick={handleUnlockClick} size="lg" className="w-full h-14 rounded-full text-lg shadow-xl">
                Unlock My Full Analysis
             </Button>
          </div>
        </div>
      </section>

      {/* Trust Quote */}
      <section className="w-full bg-primary text-primary-foreground py-16 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <p className="text-2xl italic font-light">
            "The quality of your life is determined by the quality of your decisions."
          </p>
          <p className="font-bold opacity-80 uppercase tracking-widest text-sm">— Clarity Flow Philosophy</p>
        </div>
      </section>
    </div>
  );
}
