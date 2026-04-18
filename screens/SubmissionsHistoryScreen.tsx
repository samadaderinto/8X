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

type Props = StackScreenProps<RootStackParamList, 'SubmissionsHistory'>;

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

export default function SubmissionsHistoryScreen({ navigation }: Props) {
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
      item.videoUrl.length > 42 ? item.videoUrl.slice(0, 42) + '...' : item.videoUrl;

    return (
      <View style={styles.card}>
        <View style={styles.cardTop}>
          {campaign && (
            <Image source={{ uri: campaign.brandLogo }} style={styles.logo} />
          )}
          <View style={styles.cardMeta}>
            <Text style={styles.brandName}>{campaign?.brandName ?? 'Unknown Brand'}</Text>
            <Text style={styles.urlPreview}>{urlPreview}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.cardBottom}>
          <View style={styles.bottomLeft}>
            <View style={[styles.statusBadge, { backgroundColor: status.bg }]}>
              <Text style={[styles.statusText, { color: status.text }]}>
                {status.label}
              </Text>
            </View>
            <Text style={styles.date}>{formatDate(item.submittedAt)}</Text>
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
          <View style={styles.emptyIconBox}>
            <Text style={styles.emptyIconText}>0</Text>
          </View>
          <Text style={styles.emptyTitle}>No submissions yet</Text>
          <Text style={styles.emptySubtitle}>
            Submit a video to a campaign and it will appear here
          </Text>
          <TouchableOpacity
            style={styles.emptyButton}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('CampaignsList')}
          >
            <Text style={styles.emptyButtonText}>Browse Campaigns</Text>
          </TouchableOpacity>
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
          <View style={styles.listHeader}>
            <Text style={styles.countText}>
              {submissions.length} {submissions.length === 1 ? 'submission' : 'submissions'}
            </Text>
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
  listHeader: {
    paddingTop: 20,
    paddingBottom: 16,
  },
  countText: {
    color: '#666666',
    fontSize: 13,
  },

  // Card
  card: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#2A2A2A',
  },
  cardMeta: {
    flex: 1,
    marginLeft: 12,
  },
  brandName: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  urlPreview: {
    color: '#555555',
    fontSize: 12,
    marginTop: 3,
  },
  divider: {
    height: 1,
    backgroundColor: '#2A2A2A',
    marginVertical: 12,
  },
  cardBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottomLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
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
  date: {
    color: '#666666',
    fontSize: 12,
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
    paddingHorizontal: 32,
  },
  emptyIconBox: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#2A2A2A',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  emptyIconText: {
    color: '#444444',
    fontSize: 22,
    fontWeight: '700',
  },
  emptyTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  emptySubtitle: {
    color: '#666666',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    marginTop: 8,
  },
  emptyButton: {
    marginTop: 24,
    backgroundColor: '#4ADE80',
    borderRadius: 14,
    paddingHorizontal: 28,
    paddingVertical: 14,
  },
  emptyButtonText: {
    color: '#000000',
    fontSize: 15,
    fontWeight: '700',
  },
});
