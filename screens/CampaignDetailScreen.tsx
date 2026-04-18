import React, { useLayoutEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { campaigns } from '../data/campaigns';

type Props = StackScreenProps<RootStackParamList, 'CampaignDetail'>;

export default function CampaignDetailScreen({ route, navigation }: Props) {
  const { campaignId } = route.params;
  const campaign = campaigns.find((c) => c.id === campaignId);

  useLayoutEffect(() => {
    navigation.setOptions({ title: campaign ? campaign.brandName : '' });
  }, [navigation, campaign]);

  if (!campaign) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Campaign not found.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <View>
          <Image
            source={{ uri: campaign.exampleVideos[0]?.thumbnail }}
            style={styles.heroImage}
          />
          <View style={styles.heroOverlay}>
            <View style={styles.heroTopRow}>
              <Image source={{ uri: campaign.brandLogo }} style={styles.heroLogo} />
              <Text style={styles.heroBrandName}>{campaign.brandName}</Text>
            </View>
            <Text style={styles.heroPayout}>${campaign.payoutPerVideo} per video</Text>
          </View>
        </View>

        {/* Body */}
        <View style={styles.body}>

          {/* Info row */}
          <View style={styles.infoRow}>
            <View style={styles.infoCol}>
              <Text style={styles.infoLabel}>Payout</Text>
              <Text style={styles.infoValueLarge}>${campaign.payoutPerVideo}</Text>
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoCol}>
              <Text style={styles.infoLabel}>Deadline</Text>
              <Text style={styles.infoValueMedium}>{campaign.deadline}</Text>
            </View>
          </View>

          {/* Tags */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>TAGS</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.tagsContent}
              style={styles.tagsScroll}
            >
              {campaign.tags.map((tag) => (
                <View key={tag} style={styles.tagPill}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Brief */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>THE BRIEF</Text>
            <Text style={styles.briefText}>{campaign.brief}</Text>
          </View>

          {/* Example Videos */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>EXAMPLE VIDEOS</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.videosContent}
            >
              {campaign.exampleVideos.map((video) => (
                <View key={video.id} style={styles.videoItem}>
                  <Image source={{ uri: video.thumbnail }} style={styles.videoThumb} />
                  <Text style={styles.videoCaption} numberOfLines={2}>
                    {video.caption}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>

        </View>
      </ScrollView>

      {/* Fixed CTA */}
      <View style={styles.ctaContainer}>
        <TouchableOpacity
          style={styles.ctaButton}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('SubmitVideo', { campaignId: campaign.id })}
        >
          <Text style={styles.ctaText}>Submit a Video</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
  scrollContent: {
    paddingBottom: 110,
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

  // Hero
  heroImage: {
    width: '100%',
    height: 220,
    backgroundColor: '#1A1A1A',
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 16,
  },
  heroTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  heroLogo: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#2A2A2A',
  },
  heroBrandName: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
  heroPayout: {
    color: '#4ADE80',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 4,
  },

  // Body
  body: {
    paddingHorizontal: 22,
    marginTop: 20,
  },

  // Info row
  infoRow: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoCol: {
    flex: 1,
  },
  infoLabel: {
    color: '#666666',
    fontSize: 12,
    marginBottom: 4,
  },
  infoValueLarge: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
  },
  infoValueMedium: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  infoDivider: {
    width: 1,
    backgroundColor: '#2A2A2A',
    height: 40,
    marginHorizontal: 16,
  },

  // Sections
  section: {
    marginTop: 24,
  },
  sectionLabel: {
    color: '#666666',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 10,
  },

  // Tags
  tagsScroll: {
    marginLeft: -2,
  },
  tagsContent: {
    paddingRight: 22,
  },
  tagPill: {
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#2A2A2A',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginRight: 8,
  },
  tagText: {
    color: '#CCCCCC',
    fontSize: 13,
  },

  // Brief
  briefText: {
    color: '#CCCCCC',
    fontSize: 15,
    lineHeight: 24,
  },

  // Example Videos
  videosContent: {
    paddingRight: 22,
  },
  videoItem: {
    marginRight: 14,
  },
  videoThumb: {
    width: 195,
    height: 125,
    borderRadius: 14,
    backgroundColor: '#1A1A1A',
  },
  videoCaption: {
    color: '#666666',
    fontSize: 12,
    marginTop: 6,
    maxWidth: 195,
    lineHeight: 17,
  },

  // CTA
  ctaContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#0F0F0F',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#1E1E1E',
  },
  ctaButton: {
    backgroundColor: '#4ADE80',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  ctaText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '700',
  },
});
