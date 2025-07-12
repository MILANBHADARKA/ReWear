import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
} from '@react-email/components';

export default function VerificationEmail({ username, verifyCode }) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>ReWear - Email Verification</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Your ReWear verification code: {verifyCode}</Preview>
      <Section style={{ backgroundColor: '#f9fafb', padding: '40px 20px' }}>
        <div style={{
          maxWidth: '600px',
          margin: '0 auto',
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
        }}>
          
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #22c55e, #16a34a)',
            padding: '40px 20px',
            textAlign: 'center'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              backgroundColor: 'white',
              borderRadius: '12px',
              margin: '0 auto 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{
                width: '24px',
                height: '24px',
                background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                borderRadius: '4px'
              }}></div>
            </div>
            <Heading style={{
              color: 'white',
              fontSize: '28px',
              fontWeight: 'bold',
              margin: '0'
            }}>
              ReWear
            </Heading>
          </div>

          {/* Body */}
          <div style={{ padding: '40px 20px' }}>
            <Row>
              <Heading as="h2" style={{
                color: '#1f2937',
                fontSize: '24px',
                fontWeight: 'bold',
                marginBottom: '16px'
              }}>
                Hello {username || 'there'},
              </Heading>
            </Row>
            <Row>
              <Text style={{
                color: '#6b7280',
                fontSize: '16px',
                lineHeight: '1.5',
                marginBottom: '24px'
              }}>
                Welcome to <strong>ReWear</strong> – your sustainable wardrobe companion! To activate your account and start swapping, renting, and earning points, use the verification code below:
              </Text>
            </Row>
            <Row>
              <div style={{
                fontSize: '36px',
                fontWeight: 'bold',
                textAlign: 'center',
                color: '#22c55e',
                backgroundColor: '#f1f5f9',
                padding: '24px',
                borderRadius: '12px',
                letterSpacing: '8px',
                fontFamily: 'monospace',
                border: '2px dashed #22c55e',
                margin: '24px 0'
              }}>
                {verifyCode}
              </div>
            </Row>
            <Row>
              <Text style={{
                color: '#6b7280',
                fontSize: '14px',
                lineHeight: '1.5',
                marginBottom: '16px'
              }}>
                This verification code will expire in <strong>10 minutes</strong> for your security.
              </Text>
            </Row>
            <Row>
              <Text style={{
                color: '#6b7280',
                fontSize: '14px',
                lineHeight: '1.5',
                marginBottom: '24px'
              }}>
                If you didn’t create a ReWear account, you can safely ignore this message.
              </Text>
            </Row>

            {/* Security Alert */}
            <div style={{
              backgroundColor: '#fef3c7',
              borderLeft: '4px solid #f59e0b',
              padding: '16px',
              borderRadius: '6px',
              marginTop: '24px'
            }}>
              <Text style={{
                color: '#92400e',
                fontSize: '14px',
                margin: '0',
                fontWeight: '500'
              }}>
                ⚠️ Security Tip: Never share this code with anyone. ReWear will never ask for your verification code in any form.
              </Text>
            </div>
          </div>

          {/* Footer */}
          <div style={{
            backgroundColor: '#f9fafb',
            padding: '24px 20px',
            textAlign: 'center',
            borderTop: '1px solid #e5e7eb'
          }}>
            <Text style={{
              color: '#6b7280',
              fontSize: '14px',
              margin: '0 0 8px'
            }}>
              Warm regards,<br />The ReWear Team
            </Text>
            <Text style={{
              color: '#9ca3af',
              fontSize: '12px',
              margin: '0'
            }}>
              © 2025 ReWear. All rights reserved.
            </Text>
          </div>
        </div>
      </Section>
    </Html>
  );
}
