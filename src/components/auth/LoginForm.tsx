
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { AlertCircle, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type FormValues = z.infer<typeof formSchema>;

export function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const { toast } = useToast();
  const { login } = useAuth();
  const [showDemoAccounts, setShowDemoAccounts] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      await login(values.email, values.password);
      toast({
        title: 'Success!',
        description: 'You have successfully logged in.',
      });
      onSuccess();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Invalid email or password',
        variant: 'destructive',
      });
    }
  };

  const fillDemoCredentials = (email: string) => {
    form.setValue('email', email);
    form.setValue('password', 'password');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="******" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Logging in...' : 'Login'}
        </Button>
        
        <div>
          <Button 
            type="button" 
            variant="link" 
            className="p-0 h-auto text-sm flex items-center"
            onClick={() => setShowDemoAccounts(!showDemoAccounts)}
          >
            <Info className="h-3 w-3 mr-1" />
            {showDemoAccounts ? 'Hide demo accounts' : 'Show demo accounts'}
          </Button>
          
          {showDemoAccounts && (
            <div className="mt-2 space-y-2">
              <Alert className="py-2">
                <div className="flex flex-col gap-1">
                  <AlertDescription className="text-xs flex justify-between">
                    <span>Admin account</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 text-xs"
                      onClick={() => fillDemoCredentials('admin@example.com')}
                    >
                      Use
                    </Button>
                  </AlertDescription>
                  <AlertDescription className="text-xs flex justify-between">
                    <span>Parent account</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 text-xs"
                      onClick={() => fillDemoCredentials('parent@example.com')}
                    >
                      Use
                    </Button>
                  </AlertDescription>
                  <AlertDescription className="text-xs flex justify-between">
                    <span>Incharge account</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 text-xs"
                      onClick={() => fillDemoCredentials('incharge@example.com')}
                    >
                      Use
                    </Button>
                  </AlertDescription>
                </div>
              </Alert>
              <p className="text-xs text-muted-foreground">
                Password for all demo accounts: <code>password</code>
              </p>
            </div>
          )}
        </div>
      </form>
    </Form>
  );
}
