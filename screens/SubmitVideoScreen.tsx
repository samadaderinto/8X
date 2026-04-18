import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { campaigns } from '../data/campaigns';
import { useSubmissionStore } from '../store/submissionStore';

type Props = StackScreenProps<RootStackParamList, 'SubmitVideo'>;

const isValidUrl = (url: string): boolean => {
  const trimmed = url.trim().toLowerCase();
  return (
    trimmed.includes('tiktok.com') ||
    trimmed.includes('instagram.com')
  );
};

export default function SubmitVideoScreen({ route, navigation }: Props) {
  const { campaignId } = route.params;
  const campaign = campaigns.find((c) => c.id === campaignId);

  const [url, setUrl] = useState('');
  const [focused, setFocused] = useState(false);
  const [error, setError] = useState(false);

  const addSubmission = useSubmissionStore((s) => s.addSubmission);

  const handleSubmit = () => {
    if (!isValidUrl(url.trim())) {
      setError(true);
      return;
    }
    setError(false);

    const submissionId = Date.now().toString();
    addSubmission({
      id: submissionId,
      campaignId,
      videoUrl: url.trim(),
      status: 'pending',
      submittedAt: new Date().toISOString(),
    });

    navigation.navigate('SubmissionStatus', { submissionId });
  };

  if (!campaign) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Campaign not found.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Brand card */}
          <View style={styles.brandCard}>
            <Image source={{ uri: campaign.brandLogo }} style={styles.brandLogo} />
            <View style={styles.brandMeta}>
              <Text style={styles.brandName}>{campaign.brandName}</Text>
              <Text style={styles.brandTag}>{campaign.tags[0]}</Text>
            </View>
            <Text style={styles.payout}>${campaign.payoutPerVideo} per video</Text>
          </View>

          {/* Title section */}
          <View style={styles.titleSection}>
            <Text style={styles.title}>Drop your link</Text>
            <Text style={styles.subtitle}>TikTok or Instagram only</Text>
          </View>

          {/* Input */}
          <View style={styles.inputSection}>
            <Text style={styles.label}>Video URL</Text>
            <TextInput
              style={[styles.input, focused && styles.inputFocused]}
              value={url}
              onChangeText={(text) => {
                setUrl(text);
                if (error) setError(false);
              }}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="https://www.tiktok.com/..."
              placeholderTextColor="#444444"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="url"
            />
            {error && (
              <Text style={styles.errorText}>
                Please enter a valid TikTok or Instagram URL
              </Text>
            )}
          </View>

          {/* Submit button */}
          <TouchableOpacity
            style={styles.submitButton}
            activeOpacity={0.85}
            onPress={handleSubmit}
          >
            <Text style={styles.submitText}>Submit for Review</Text>
          </TouchableOpacity>

          {/* Footer */}
          <Text style={styles.footer}>
            Only TikTok &amp; Instagram links are accepted
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 22,
    paddingBottom: 40,
  },
  notFound: {
    flex: 1,
    backgroundColor: '#0F0F0F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notFoundText: {
    color: '#888',
    fontSize: 16,
  },

  // Brand card
  brandCard: {
    marginTop: 24,
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandLogo: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#2A2A2A',
  },
  brandMeta: {
    marginLeft: 12,
    flex: 1,
  },
  brandName: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  brandTag: {
    color: '#666666',
    fontSize: 12,
    marginTop: 2,
  },
  payout: {
    color: '#4ADE80',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'right',
  },

  // Title
  titleSection: {
    marginTop: 28,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '800',
  },
  subtitle: {
    color: '#666666',
    fontSize: 14,
    marginTop: 4,
  },

  // Input
  inputSection: {
    marginTop: 28,
  },
  label: {
    color: '#888888',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#1A1A1A',
    borderRadius: 14,
    padding: 16,
    color: '#FFFFFF',
    fontSize: 14,
    borderWidth: 1.5,
    borderColor: '#2A2A2A',
  },
  inputFocused: {
    borderColor: '#4ADE80',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 13,
    marginTop: 8,
  },

  // Button
  submitButton: {
    backgroundColor: '#4ADE80',
    borderRadius: 16,
    paddingVertical: 17,
    alignItems: 'center',
    marginTop: 24,
  },
  submitText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '700',
  },

  // Footer
  footer: {
    color: '#444444',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 14,
  },
});
