export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      achievements: {
        Row: {
          category: string
          created_at: string
          description: string
          id: string
          name: string
          points: number
        }
        Insert: {
          category: string
          created_at?: string
          description: string
          id?: string
          name: string
          points?: number
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          id?: string
          name?: string
          points?: number
        }
        Relationships: []
      }
      calendar_connections: {
        Row: {
          access_token: string
          calendar_id: string | null
          created_at: string
          id: string
          provider: string
          refresh_token: string | null
          token_expires_at: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          access_token: string
          calendar_id?: string | null
          created_at?: string
          id?: string
          provider: string
          refresh_token?: string | null
          token_expires_at?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          access_token?: string
          calendar_id?: string | null
          created_at?: string
          id?: string
          provider?: string
          refresh_token?: string | null
          token_expires_at?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      focus_sessions: {
        Row: {
          completed_at: string
          created_at: string
          duration_minutes: number
          id: string
          user_id: string
        }
        Insert: {
          completed_at?: string
          created_at?: string
          duration_minutes: number
          id?: string
          user_id: string
        }
        Update: {
          completed_at?: string
          created_at?: string
          duration_minutes?: number
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      habit_completions: {
        Row: {
          completed_at: string
          habit_id: string
          id: string
          user_id: string
        }
        Insert: {
          completed_at?: string
          habit_id: string
          id?: string
          user_id: string
        }
        Update: {
          completed_at?: string
          habit_id?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "habit_completions_habit_id_fkey"
            columns: ["habit_id"]
            isOneToOne: false
            referencedRelation: "habits"
            referencedColumns: ["id"]
          },
        ]
      }
      habits: {
        Row: {
          created_at: string
          description: string | null
          frequency: string
          goal_metric: string | null
          goal_period: string | null
          goal_target: number | null
          id: string
          is_template: boolean | null
          name: string
          parent_habit_id: string | null
          suggested_frequency: string | null
          template_category: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          frequency?: string
          goal_metric?: string | null
          goal_period?: string | null
          goal_target?: number | null
          id?: string
          is_template?: boolean | null
          name: string
          parent_habit_id?: string | null
          suggested_frequency?: string | null
          template_category?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          frequency?: string
          goal_metric?: string | null
          goal_period?: string | null
          goal_target?: number | null
          id?: string
          is_template?: boolean | null
          name?: string
          parent_habit_id?: string | null
          suggested_frequency?: string | null
          template_category?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "habits_parent_habit_id_fkey"
            columns: ["parent_habit_id"]
            isOneToOne: false
            referencedRelation: "habits"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      user_achievements: {
        Row: {
          achievement_id: string | null
          id: string
          unlocked_at: string
          user_id: string | null
        }
        Insert: {
          achievement_id?: string | null
          id?: string
          unlocked_at?: string
          user_id?: string | null
        }
        Update: {
          achievement_id?: string | null
          id?: string
          unlocked_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
        ]
      }
      user_preferences: {
        Row: {
          challenges: string[] | null
          created_at: string
          focus_areas: string[] | null
          habit_goals: string[] | null
          habit_motivations: string[] | null
          id: string
          onboarding_completed: boolean | null
          preferred_habit_categories: string[] | null
          primary_goals: string[] | null
          updated_at: string
        }
        Insert: {
          challenges?: string[] | null
          created_at?: string
          focus_areas?: string[] | null
          habit_goals?: string[] | null
          habit_motivations?: string[] | null
          id: string
          onboarding_completed?: boolean | null
          preferred_habit_categories?: string[] | null
          primary_goals?: string[] | null
          updated_at?: string
        }
        Update: {
          challenges?: string[] | null
          created_at?: string
          focus_areas?: string[] | null
          habit_goals?: string[] | null
          habit_motivations?: string[] | null
          id?: string
          onboarding_completed?: boolean | null
          preferred_habit_categories?: string[] | null
          primary_goals?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      habit_category:
        | "health"
        | "career"
        | "personal"
        | "learning"
        | "relationships"
        | "productivity"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
