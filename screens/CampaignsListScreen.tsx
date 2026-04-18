import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { Campaign } from '../types';
import { campaigns } from '../data/campaigns';

type Props = StackScreenProps<RootStackParamList, 'CampaignsList'>;

export default function CampaignsListScreen({ navigation }: Props) {
  const renderCard = ({ item }: { item: Campaign }) => {
    const banner = item.exampleVideos[0]?.thumbnail;

    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.75}
        onPress={() => navigation.navigate('CampaignDetail', { campaignId: item.id })}
      >
        {/* Image strip */}
        <View>
          <Image source={{ uri: banner }} style={styles.bannerImage} />
          <View style={styles.bannerOverlay}>
            <View style={styles.activePill}>
              <Text style={styles.activePillText}>Active</Text>
            </View>
          </View>
        </View>

        {/* Card body */}
        <View style={styles.cardBody}>
          {/* Brand row */}
          <View style={styles.brandRow}>
            <Image source={{ uri: item.brandLogo }} style={styles.brandLogo} />
            <Text style={styles.brandName}>{item.brandName}</Text>
            <Text style={styles.arrow}>›</Text>
          </View>

          {/* Payout */}
          <Text style={styles.payout}>${item.payoutPerVideo} per video</Text>

          {/* Bottom row */}
          <View style={styles.bottomRow}>
            <Text style={styles.deadline}>Due {item.deadline}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.screen}>
      <FlatList
        data={campaigns}
        keyExtractor={(item) => item.id}
        renderItem={renderCard}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.heading}>Campaigns</Text>
            <View style={styles.headerBottomRow}>
              <Text style={styles.subheading}>4 active opportunities</Text>
              <TouchableOpacity
                style={styles.mySubmissionsLink}
                activeOpacity={0.7}
                onPress={() => navigation.navigate('SubmissionsHistory')}
              >
                <Text style={styles.mySubmissionsText}>My Submissions</Text>
                <Text style={styles.mySubmissionsChevron}>›</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  heading: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '800',
  },
  headerBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  mySubmissionsLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  mySubmissionsText: {
    color: '#4ADE80',
    fontSize: 13,
  },
  mySubmissionsChevron: {
    color: '#4ADE80',
    fontSize: 16,
    lineHeight: 20,
  },
  subheading: {
    color: '#666666',
    fontSize: 14,
    marginTop: 4,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },

  // Card
  card: {
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 14,
  },

  // Image strip
  bannerImage: {
    width: '100%',
    height: 110,
    backgroundColor: '#2A2A2A',
  },
  bannerOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    padding: 10,
  },
  activePill: {
    backgroundColor: 'rgba(74,222,128,0.15)',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  activePillText: {
    color: '#4ADE80',
    fontSize: 11,
    fontWeight: '600',
  },

  // Card body
  cardBody: {
    padding: 14,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandLogo: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#2A2A2A',
  },
  brandName: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    marginLeft: 10,
    flex: 1,
  },
  arrow: {
    color: '#444444',
    fontSize: 20,
  },
  payout: {
    color: '#4ADE80',
    fontSize: 24,
    fontWeight: '800',
    marginTop: 10,
  },
  bottomRow: {
    marginTop: 10,
  },
  deadline: {
    color: '#666666',
    fontSize: 12,
  },
});
