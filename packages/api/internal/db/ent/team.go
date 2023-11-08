// Code generated by ent, DO NOT EDIT.

package ent

import (
	"fmt"
	"strings"
	"time"

	"entgo.io/ent"
	"entgo.io/ent/dialect/sql"
	"github.com/e2b-dev/infra/packages/api/internal/db/ent/team"
	"github.com/e2b-dev/infra/packages/api/internal/db/ent/tier"
	"github.com/google/uuid"
)

// Team is the model entity for the Team schema.
type Team struct {
	config `json:"-"`
	// ID of the ent.
	ID uuid.UUID `json:"id,omitempty"`
	// CreatedAt holds the value of the "created_at" field.
	CreatedAt time.Time `json:"created_at,omitempty"`
	// IsDefault holds the value of the "is_default" field.
	IsDefault bool `json:"is_default,omitempty"`
	// IsBlocked holds the value of the "is_blocked" field.
	IsBlocked bool `json:"is_blocked,omitempty"`
	// Name holds the value of the "name" field.
	Name string `json:"name,omitempty"`
	// Tier holds the value of the "tier" field.
	Tier string `json:"tier,omitempty"`
	// Edges holds the relations/edges for other nodes in the graph.
	// The values are being populated by the TeamQuery when eager-loading is set.
	Edges        TeamEdges `json:"edges"`
	selectValues sql.SelectValues
}

// TeamEdges holds the relations/edges for other nodes in the graph.
type TeamEdges struct {
	// Users holds the value of the users edge.
	Users []*User `json:"users,omitempty"`
	// TeamAPIKeys holds the value of the team_api_keys edge.
	TeamAPIKeys []*TeamApiKey `json:"team_api_keys,omitempty"`
	// TeamTier holds the value of the team_tier edge.
	TeamTier *Tier `json:"team_tier,omitempty"`
	// Envs holds the value of the envs edge.
	Envs []*Env `json:"envs,omitempty"`
	// UsersTeams holds the value of the users_teams edge.
	UsersTeams []*UsersTeams `json:"users_teams,omitempty"`
	// loadedTypes holds the information for reporting if a
	// type was loaded (or requested) in eager-loading or not.
	loadedTypes [5]bool
}

// UsersOrErr returns the Users value or an error if the edge
// was not loaded in eager-loading.
func (e TeamEdges) UsersOrErr() ([]*User, error) {
	if e.loadedTypes[0] {
		return e.Users, nil
	}
	return nil, &NotLoadedError{edge: "users"}
}

// TeamAPIKeysOrErr returns the TeamAPIKeys value or an error if the edge
// was not loaded in eager-loading.
func (e TeamEdges) TeamAPIKeysOrErr() ([]*TeamApiKey, error) {
	if e.loadedTypes[1] {
		return e.TeamAPIKeys, nil
	}
	return nil, &NotLoadedError{edge: "team_api_keys"}
}

// TeamTierOrErr returns the TeamTier value or an error if the edge
// was not loaded in eager-loading, or loaded but was not found.
func (e TeamEdges) TeamTierOrErr() (*Tier, error) {
	if e.loadedTypes[2] {
		if e.TeamTier == nil {
			// Edge was loaded but was not found.
			return nil, &NotFoundError{label: tier.Label}
		}
		return e.TeamTier, nil
	}
	return nil, &NotLoadedError{edge: "team_tier"}
}

// EnvsOrErr returns the Envs value or an error if the edge
// was not loaded in eager-loading.
func (e TeamEdges) EnvsOrErr() ([]*Env, error) {
	if e.loadedTypes[3] {
		return e.Envs, nil
	}
	return nil, &NotLoadedError{edge: "envs"}
}

// UsersTeamsOrErr returns the UsersTeams value or an error if the edge
// was not loaded in eager-loading.
func (e TeamEdges) UsersTeamsOrErr() ([]*UsersTeams, error) {
	if e.loadedTypes[4] {
		return e.UsersTeams, nil
	}
	return nil, &NotLoadedError{edge: "users_teams"}
}

// scanValues returns the types for scanning values from sql.Rows.
func (*Team) scanValues(columns []string) ([]any, error) {
	values := make([]any, len(columns))
	for i := range columns {
		switch columns[i] {
		case team.FieldIsDefault, team.FieldIsBlocked:
			values[i] = new(sql.NullBool)
		case team.FieldName, team.FieldTier:
			values[i] = new(sql.NullString)
		case team.FieldCreatedAt:
			values[i] = new(sql.NullTime)
		case team.FieldID:
			values[i] = new(uuid.UUID)
		default:
			values[i] = new(sql.UnknownType)
		}
	}
	return values, nil
}

// assignValues assigns the values that were returned from sql.Rows (after scanning)
// to the Team fields.
func (t *Team) assignValues(columns []string, values []any) error {
	if m, n := len(values), len(columns); m < n {
		return fmt.Errorf("mismatch number of scan values: %d != %d", m, n)
	}
	for i := range columns {
		switch columns[i] {
		case team.FieldID:
			if value, ok := values[i].(*uuid.UUID); !ok {
				return fmt.Errorf("unexpected type %T for field id", values[i])
			} else if value != nil {
				t.ID = *value
			}
		case team.FieldCreatedAt:
			if value, ok := values[i].(*sql.NullTime); !ok {
				return fmt.Errorf("unexpected type %T for field created_at", values[i])
			} else if value.Valid {
				t.CreatedAt = value.Time
			}
		case team.FieldIsDefault:
			if value, ok := values[i].(*sql.NullBool); !ok {
				return fmt.Errorf("unexpected type %T for field is_default", values[i])
			} else if value.Valid {
				t.IsDefault = value.Bool
			}
		case team.FieldIsBlocked:
			if value, ok := values[i].(*sql.NullBool); !ok {
				return fmt.Errorf("unexpected type %T for field is_blocked", values[i])
			} else if value.Valid {
				t.IsBlocked = value.Bool
			}
		case team.FieldName:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field name", values[i])
			} else if value.Valid {
				t.Name = value.String
			}
		case team.FieldTier:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field tier", values[i])
			} else if value.Valid {
				t.Tier = value.String
			}
		default:
			t.selectValues.Set(columns[i], values[i])
		}
	}
	return nil
}

// Value returns the ent.Value that was dynamically selected and assigned to the Team.
// This includes values selected through modifiers, order, etc.
func (t *Team) Value(name string) (ent.Value, error) {
	return t.selectValues.Get(name)
}

// QueryUsers queries the "users" edge of the Team entity.
func (t *Team) QueryUsers() *UserQuery {
	return NewTeamClient(t.config).QueryUsers(t)
}

// QueryTeamAPIKeys queries the "team_api_keys" edge of the Team entity.
func (t *Team) QueryTeamAPIKeys() *TeamApiKeyQuery {
	return NewTeamClient(t.config).QueryTeamAPIKeys(t)
}

// QueryTeamTier queries the "team_tier" edge of the Team entity.
func (t *Team) QueryTeamTier() *TierQuery {
	return NewTeamClient(t.config).QueryTeamTier(t)
}

// QueryEnvs queries the "envs" edge of the Team entity.
func (t *Team) QueryEnvs() *EnvQuery {
	return NewTeamClient(t.config).QueryEnvs(t)
}

// QueryUsersTeams queries the "users_teams" edge of the Team entity.
func (t *Team) QueryUsersTeams() *UsersTeamsQuery {
	return NewTeamClient(t.config).QueryUsersTeams(t)
}

// Update returns a builder for updating this Team.
// Note that you need to call Team.Unwrap() before calling this method if this Team
// was returned from a transaction, and the transaction was committed or rolled back.
func (t *Team) Update() *TeamUpdateOne {
	return NewTeamClient(t.config).UpdateOne(t)
}

// Unwrap unwraps the Team entity that was returned from a transaction after it was closed,
// so that all future queries will be executed through the driver which created the transaction.
func (t *Team) Unwrap() *Team {
	_tx, ok := t.config.driver.(*txDriver)
	if !ok {
		panic("ent: Team is not a transactional entity")
	}
	t.config.driver = _tx.drv
	return t
}

// String implements the fmt.Stringer.
func (t *Team) String() string {
	var builder strings.Builder
	builder.WriteString("Team(")
	builder.WriteString(fmt.Sprintf("id=%v, ", t.ID))
	builder.WriteString("created_at=")
	builder.WriteString(t.CreatedAt.Format(time.ANSIC))
	builder.WriteString(", ")
	builder.WriteString("is_default=")
	builder.WriteString(fmt.Sprintf("%v", t.IsDefault))
	builder.WriteString(", ")
	builder.WriteString("is_blocked=")
	builder.WriteString(fmt.Sprintf("%v", t.IsBlocked))
	builder.WriteString(", ")
	builder.WriteString("name=")
	builder.WriteString(t.Name)
	builder.WriteString(", ")
	builder.WriteString("tier=")
	builder.WriteString(t.Tier)
	builder.WriteByte(')')
	return builder.String()
}

// Teams is a parsable slice of Team.
type Teams []*Team
