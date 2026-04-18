import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { Submission } from '../types';
import { campaigns } from '../data/campaigns';
import { useSubmissionStore } from '../store/submissionStore';

type Props = StackScreenProps<RootStackParamList, 'SubmissionStatus'>;

const STATUS_STYLES: Record<
  Submission['status'],
  { bg: string; text: string; label: string }
> = {
  pending:  { bg: '#2D2000', text: '#F59E0B', label: 'Pending' },
  approved: { bg: '#052e16', text: '#4ADE80', label: 'Approved' },
  rejected: { bg: '#2D0A0A', text: '#EF4444', label: 'Rejected' },
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function SubmissionStatusScreen() {
  const submissions = useSubmissionStore((s) => s.submissions);
  const updateSubmissionStatus = useSubmissionStore((s) => s.updateSubmissionStatus);

  const handleSimulate = (id: string) => {
    const outcome = Math.random() > 0.5 ? 'approved' : 'rejected';
    updateSubmissionStatus(id, outcome);
  };

  const renderCard = ({ item }: { item: Submission }) => {
    const campaign = campaigns.find((c) => c.id === item.campaignId);
    const status = STATUS_STYLES[item.status];
    const urlPreview =
      item.videoUrl.length > 45 ? item.videoUrl.slice(0, 45) + '...' : item.videoUrl;

    return (
      <View style={styles.card}>
        {/* Top row */}
        <View style={styles.topRow}>
          {campaign && (
            <Image source={{ uri: campaign.brandLogo }} style={styles.logo} />
          )}
          <View style={styles.brandMeta}>
            <Text style={styles.brandName}>{campaign?.brandName ?? 'Unknown Brand'}</Text>
            <Text style={styles.submittedAt}>{formatDate(item.submittedAt)}</Text>
          </View>
        </View>

        {/* URL preview */}
        <Text style={styles.urlPreview}>{urlPreview}</Text>

        {/* Bottom row */}
        <View style={styles.bottomRow}>
          <View style={[styles.statusBadge, { backgroundColor: status.bg }]}>
            <Text style={[styles.statusText, { color: status.text }]}>
              {status.label}
            </Text>
          </View>

          {item.status === 'pending' && (
            <TouchableOpacity
              style={styles.simulateButton}
              activeOpacity={0.75}
              onPress={() => handleSimulate(item.id)}
            >
              <Text style={styles.simulateText}>Simulate Review</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  if (submissions.length === 0) {
    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>📭</Text>
          <Text style={styles.emptyTitle}>No submissions yet</Text>
          <Text style={styles.emptySubtitle}>
            Submit a video to a campaign to see it here
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        data={submissions}
        keyExtractor={(item) => item.id}
        renderItem={renderCard}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.heading}>Your Submissions</Text>
            <Text style={styles.count}>{submissions.length} submitted</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  // Header
  header: {
    marginTop: 24,
    marginBottom: 20,
  },
  heading: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
  },
  count: {
    color: '#888888',
    fontSize: 14,
    marginTop: 4,
  },

  // Card
  card: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#2A2A2A',
  },
  brandMeta: {
    marginLeft: 10,
  },
  brandName: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  submittedAt: {
    color: '#888888',
    fontSize: 12,
    marginTop: 2,
  },
  urlPreview: {
    color: '#555555',
    fontSize: 12,
    marginTop: 8,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  statusBadge: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  simulateButton: {
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  simulateText: {
    color: '#AAAAAA',
    fontSize: 12,
  },

  // Empty state
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  emptyIcon: {
    fontSize: 64,
  },
  emptyTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 16,
  },
  emptySubtitle: {
    color: '#888888',
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    marginTop: 8,
  },
});
