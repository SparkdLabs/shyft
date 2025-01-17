import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { AuthError } from "@supabase/supabase-js";

export const Auth = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session) {
          try {
            const { data: preferences, error } = await supabase
              .from('user_preferences')
              .select('onboarding_completed')
              .eq('id', session.user.id)
              .maybeSingle();

            if (error) {
              console.error('Error fetching preferences:', error);
              throw error;
            }

            if (!preferences) {
              const { error: insertError } = await supabase
                .from('user_preferences')
                .insert([{ 
                  id: session.user.id,
                  onboarding_completed: false
                }]);

              if (insertError) {
                console.error('Error creating preferences:', insertError);
                throw insertError;
              }

              navigate("/onboarding");
            } else if (!preferences.onboarding_completed) {
              navigate("/onboarding");
            } else {
              navigate("/dashboard");
            }
          } catch (error) {
            console.error('Error in auth flow:', error);
            setErrorMessage("An error occurred during sign in. Please try again.");
          }
        }
        if (event === "SIGNED_OUT") {
          navigate("/");
          setErrorMessage("");
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="flex min-h-screen">
      {/* Left side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-radial from-primary-100 via-white to-white">
        <div className="absolute inset-0 flex flex-col items-center justify-center p-12">
          <img 
            src="/lovable-uploads/ef538683-98ce-45d3-9690-cb27cdf529a9.png" 
            alt="Shyft Logo" 
            className="w-48 mb-8 animate-fadeIn"
          />
          <div className="relative w-full max-w-2xl animate-slideUp">
            <img
              src="/lovable-uploads/987b0f35-0fd8-408b-86be-57f31d51c2af.png"
              alt="Team Collaboration"
              className="w-full rounded-lg shadow-custom-md"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-primary-100/90 to-transparent rounded-b-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Transform Your Habits, Transform Your Life
              </h2>
              <p className="text-gray-700">
                Join thousands of professionals who are already achieving their goals with our intelligent habit-building platform
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8 animate-fadeIn">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-900 bg-clip-text text-transparent">
              Welcome to Shyft
            </h1>
            <p className="text-gray-600">Sign in to continue your journey</p>
          </div>

          {errorMessage && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          <div className="bg-white rounded-lg">
            <SupabaseAuth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#9b87f5',
                      brandAccent: '#7c3aed',
                      brandButtonText: 'white',
                      defaultButtonBackground: 'white',
                      defaultButtonBackgroundHover: '#f9fafb',
                      defaultButtonBorder: '#e5e7eb',
                      defaultButtonText: '#374151',
                    },
                    space: {
                      inputPadding: '12px',
                      buttonPadding: '12px',
                    },
                    borderWidths: {
                      buttonBorderWidth: '1px',
                      inputBorderWidth: '1px',
                    },
                    radii: {
                      borderRadiusButton: '8px',
                      buttonBorderRadius: '8px',
                      inputBorderRadius: '8px',
                    },
                    fonts: {
                      bodyFontFamily: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
                      buttonFontFamily: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
                    },
                  },
                },
                className: {
                  container: 'space-y-4',
                  button: 'w-full font-medium shadow-sm hover:translate-y-[-1px] transition-all duration-200',
                  input: 'w-full border-gray-300 focus:border-primary focus:ring-primary text-base',
                  label: 'text-sm font-medium text-gray-700',
                  anchor: 'text-primary-600 hover:text-primary-700 font-medium',
                },
              }}
              providers={[]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};