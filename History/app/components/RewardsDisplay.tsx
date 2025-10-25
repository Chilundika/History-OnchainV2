"use client";

import { useState, useEffect } from "react";
import { Card, Icon } from "./DemoComponents";
import { type UserRewards } from "../lib/types";

export function RewardsDisplay() {
  const [rewards, setRewards] = useState<UserRewards>({
    totalPoints: 0,
    level: 0,
    discoveries: 0,
    lastUpdated: new Date()
  });

  useEffect(() => {
    // Load from localStorage
    const storedRewards = localStorage.getItem('userRewards');
    if (storedRewards) {
      try {
        setRewards(JSON.parse(storedRewards));
      } catch (e) {
        console.error("Failed to parse rewards:", e);
      }
    }
  }, []);

  // Calculate progress to next level
  const pointsInCurrentLevel = rewards.totalPoints % 100;
  const progressPercentage = pointsInCurrentLevel;

  return (
    <Card title="Your Progress" className="post-shadow">
      <div className="space-y-6">
        {/* Level Display */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-2">
            <Icon name="star" className="text-[var(--app-accent)]" size="lg" />
            <div>
              <div className="text-4xl font-bold text-[var(--app-foreground)]">
                Level {rewards.level}
              </div>
              <div className="text-sm text-[var(--app-foreground-muted)]">
                {rewards.totalPoints} points
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div>
          <div className="flex justify-between text-xs text-[var(--app-foreground-muted)] mb-2">
            <span>Progress to Level {rewards.level + 1}</span>
            <span>{pointsInCurrentLevel}/100</span>
          </div>
          <div className="w-full bg-[var(--app-gray)] rounded-full h-3 overflow-hidden">
            <div 
              className="h-full bg-[var(--app-accent)] rounded-full transition-all duration-500 ease-out post-shadow"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[var(--app-card-border)]">
          <div className="text-center">
            <div className="text-2xl font-bold text-[var(--app-accent)]">
              {rewards.discoveries}
            </div>
            <div className="text-sm text-[var(--app-foreground-muted)]">
              Discoveries
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[var(--app-accent)]">
              {rewards.totalPoints}
            </div>
            <div className="text-sm text-[var(--app-foreground-muted)]">
              Total Points
            </div>
          </div>
        </div>

        {/* Achievement Badge */}
        {rewards.discoveries > 0 && (
          <div className="pt-4 border-t border-[var(--app-card-border)] bg-[var(--app-accent-light)] rounded-lg p-3 text-center">
            <p className="text-sm text-[var(--app-accent)] font-semibold">
              🏆 Explorer Badge Earned!
            </p>
            <p className="text-xs text-[var(--app-foreground-muted)] mt-1">
              Keep discovering to unlock more achievements
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
